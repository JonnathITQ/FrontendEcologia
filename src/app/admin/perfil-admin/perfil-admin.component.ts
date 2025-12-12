import { Component, OnInit } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/Admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, FormsModule],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit {
  public admin: Admin;
  public url = urlBase.url;
  public isEdit: boolean = false;
  public fileToUpload: File | null = null;

  constructor(private _adminService: AdminService) {
    this.admin = new Admin('', '', '', 0, '', '', false, '', '', '');
  }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin() {
    const identity = this._adminService.getIdentity();
    if (identity) {
      this.admin = identity;
    } else {
      this.admin = new Admin('', '', '', 0, '', '', false, '', '', '');
    }
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if (!this.isEdit) {
      this.getAdmin(); // Reset if cancelled
    }
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit(form: any) {
    this._adminService.updateAdmin(this.admin._id, this.admin).subscribe(
      response => {
        if (response.admin) {
          // Update local storage with the updated admin data
          localStorage.setItem('identity', JSON.stringify(response.admin));
          this.admin = response.admin;

          // Upload image if selected
          if (this.fileToUpload) {
            this._adminService.subirImagen(this.admin._id, this.fileToUpload).subscribe(
              imgResponse => {
                if (imgResponse.admin) {
                  this.admin.imagen = imgResponse.admin.imagen;
                  localStorage.setItem('identity', JSON.stringify(this.admin));
                  Swal.fire('Actualizado', 'Perfil actualizado correctamente', 'success');
                  this.isEdit = false;
                  // Reload to update sidebar image
                  window.location.reload();
                } else {
                  Swal.fire('Advertencia', 'Perfil actualizado pero la imagen no se pudo procesar', 'warning');
                }
              },
              error => {
                console.log(error);
                Swal.fire('Advertencia', 'Perfil actualizado pero error al subir imagen', 'warning');
              }
            );
          } else {
            Swal.fire('Actualizado', 'Perfil actualizado correctamente', 'success');
            this.isEdit = false;
          }
        } else {
          Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
        }
      },
      error => {
        console.log(error);
        Swal.fire('Error', 'Error al actualizar perfil', 'error');
      }
    );
  }
}
