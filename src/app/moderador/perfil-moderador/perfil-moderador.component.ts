import { Component } from '@angular/core';
import { SidebarModeradorComponent } from '../sidebar-moderador/sidebar-moderador.component';
import { ModeradorService } from '../../services/moderador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-perfil-moderador',
  standalone: true,
  imports: [SidebarModeradorComponent, FormsModule, CommonModule],
  templateUrl: './perfil-moderador.component.html',
  styleUrl: './perfil-moderador.component.css'
})
export class PerfilModeradorComponent {
  public identity: any;
  public token: any;
  public user: any = {};
  public isEditing: boolean = false;
  public passwordConfirm: string = '';
  public message_success: string | undefined;
  public message_error: string | undefined;
  public showModal: boolean = false;
  public filesToUpload: Array<File> | undefined;
  public timestamp: number = new Date().getTime();
  public url = urlBase.url;

  constructor(
    private _moderadorService: ModeradorService
  ) {
    this.identity = this._moderadorService.getIdentity();
    this.token = this._moderadorService.getToken();
    if (this.identity) {
      this.user = { ...this.identity };
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.identity) {
      this.user = { ...this.identity };
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

  updateProfile() {
    if (!this.identity) return;

    let loginData = {
      correo: this.identity.correo,
      contrasenia: this.passwordConfirm
    };

    this._moderadorService.login(loginData).subscribe(
      response => {
        if (response.moderador) {
          if (this.filesToUpload) {
            this._moderadorService.subirImagen(this.identity._id, this.filesToUpload[0]).subscribe(
              response => {
                this.user.imagen = response.moderador.imagen;
                this.identity.imagen = response.moderador.imagen;
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
    this._moderadorService.update_moderador(this.identity._id, this.user).subscribe(
      response => {
        if (response.moderador) {
          this.identity = response.moderador;
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
