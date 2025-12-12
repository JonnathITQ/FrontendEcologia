import { Component, OnInit } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { AdminService } from '../../services/admin.service';
import { Moderador } from '../../models/Moderador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-moderadores',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, FormsModule],
  templateUrl: './lista-moderadores.component.html',
  styleUrl: './lista-moderadores.component.css'
})
export class ListaModeradoresComponent implements OnInit {
  public moderadores: Moderador[] = [];
  public moderadorModel: Moderador;
  public isEdit: boolean = false;
  public showModal: boolean = false;

  constructor(private _adminService: AdminService) {
    this.moderadorModel = new Moderador('', '', '', 0, '', '', false, '', '');
  }

  ngOnInit(): void {
    this.getModeradores();
  }

  getModeradores() {
    this._adminService.getModeradores().subscribe(
      response => {
        if (response.moderadores) {
          this.moderadores = response.moderadores;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openModal(moderador: Moderador | null = null) {
    this.showModal = true;
    if (moderador) {
      this.isEdit = true;
      this.moderadorModel = { ...moderador }; // Copy object
      this.moderadorModel.contrasenia = ''; // Clear password for security/edit
    } else {
      this.isEdit = false;
      this.moderadorModel = new Moderador('', '', '', 0, '', '', false, '', '');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit(form: any) {
    if (this.isEdit) {
      this._adminService.updateModerador(this.moderadorModel._id, this.moderadorModel).subscribe(
        response => {
          this.getModeradores();
          this.closeModal();
          Swal.fire('Actualizado', 'Moderador actualizado correctamente', 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error', 'Error al actualizar moderador', 'error');
        }
      );
    } else {
      this._adminService.createModerador(this.moderadorModel).subscribe(
        response => {
          this.getModeradores();
          this.closeModal();
          Swal.fire('Creado', 'Moderador creado correctamente', 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error', 'Error al crear moderador', 'error');
        }
      );
    }
  }

  deleteModerador(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._adminService.deleteModerador(id).subscribe(
          response => {
            this.getModeradores();
            Swal.fire('Borrado!', 'El moderador ha sido eliminado.', 'success');
          },
          error => {
            console.log(error);
            Swal.fire('Error', 'Error al eliminar moderador', 'error');
          }
        );
      }
    });
  }
}
