import { Component } from '@angular/core';
import { SidebarUsuarioComponent } from '../sidebar-usuario/sidebar-usuario.component';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [SidebarUsuarioComponent, FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  public identity: Usuario | null = null;
  public token: any;
  public user: Usuario = {} as Usuario;
  public isEditing: boolean = false;
  public passwordConfirm: string = '';
  public message_success: string | undefined;
  public message_error: string | undefined;
  public showModal: boolean = false;
  public filesToUpload: Array<File> | undefined;
  public timestamp: number = new Date().getTime();
  public url: string;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.url = this._usuarioService.url;
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    if (this.identity) {
      this.user = { ...this.identity }; // Copy identity to user for editing
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.identity) {
      this.user = { ...this.identity }; // Reset changes if cancelled
    }
  }

  openConfirmModal() {
    this.showModal = true;
    this.passwordConfirm = '';
    this.message_error = undefined;
  }

  closeModal() {
    this.showModal = false;
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  getUsername(email: string): string {
    if (!email) return '';
    return email.split('@')[0];
  }

  updateProfile() {
    if (!this.identity) return;

    // Verify password first
    let loginData = {
      correo: this.identity.correo,
      contrasenia: this.passwordConfirm
    };

    this._usuarioService.login(loginData).subscribe(
      response => {
        if (response.usuario) {
          // Password correct, proceed with update
          if (this.filesToUpload) {
            // Upload image first
            this._usuarioService.subirImagen(this.identity!._id, this.filesToUpload[0]).subscribe(
              response => {
                this.user.imagen = response.usuario.imagen;
                this.identity!.imagen = response.usuario.imagen;
                this.timestamp = new Date().getTime();
                this.updateUserData();
              },
              error => {
                this.message_error = 'Error al subir la imagen';
              }
            );
          } else {
            this.updateUserData();
          }
        } else {
          this.message_error = 'Contraseña incorrecta';
        }
      },
      error => {
        this.message_error = 'Contraseña incorrecta';
      }
    );
  }

  updateUserData() {
    this._usuarioService.update_usuario(this.identity!._id, this.user).subscribe(
      response => {
        if (response.usuario) {
          this.identity = response.usuario;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.message_success = 'Perfil actualizado correctamente';
          this.isEditing = false;
          this.closeModal();

          setTimeout(() => {
            this.message_success = undefined;
          }, 3000);
        } else {
          this.message_error = response.message;
        }
      },
      error => {
        this.message_error = 'Error al actualizar el perfil';
      }
    );
  }
}
