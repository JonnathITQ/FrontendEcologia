import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-usuario',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  public user: any = {};
  public file: File | undefined;
  public message_error: string | undefined;
  public message_success: string | undefined;
  public imgSelected: any | ArrayBuffer = 'assets/img/default-user.png';

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  registrar(registerForm: any) {
    if (registerForm.valid) {
      if (this.user.contrasenia != this.user.confirmarContrasenia) {
        this.message_error = 'Las contraseñas no coinciden';
        return;
      }

      this._usuarioService.registrar(this.user).subscribe(
        response => {
          if (response.usuario) {
            // Upload image if selected
            if (this.file) {
              this._usuarioService.subirImagen(response.usuario._id, this.file).subscribe(
                res => {
                  this.message_success = 'Usuario registrado correctamente';
                  setTimeout(() => {
                    this._router.navigate(['/sesiones/loginUsuario']);
                  }, 2000);
                },
                err => {
                  this.message_success = 'Usuario registrado (sin imagen)';
                  setTimeout(() => {
                    this._router.navigate(['/sesiones/loginUsuario']);
                  }, 2000);
                }
              );
            } else {
              this.message_success = 'Usuario registrado correctamente';
              setTimeout(() => {
                this._router.navigate(['/sesiones/loginUsuario']);
              }, 2000);
            }
          } else {
            this.message_error = response.message;
          }
        },
        error => {
          console.log(error);
          if (error.error && error.error.message) {
            this.message_error = error.error.message;
          } else {
            this.message_error = 'Error al registrar usuario';
          }
        }
      );
    } else {
      this.message_error = 'Complete el formulario correctamente';
    }
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
