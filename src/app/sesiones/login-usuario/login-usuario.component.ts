import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-usuario',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {
  public user: any = {};
  public token: any;
  public identity: any;
  public message_error: string | undefined;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        correo: this.user.email,
        contrasenia: this.user.password
      }

      this._usuarioService.login(data).subscribe(
        response => {
          console.log('LOGIN RESPONSE:', response);
          if (response.usuario == undefined) {
            this.message_error = response.message;
          } else {
            this.token = response.token;
            this.identity = response.usuario;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            this._router.navigate(['/usuario']);
          }
        },
        error => {
          console.log(error);
          if (error.error && error.error.message) {
            this.message_error = error.error.message;
          } else {
            this.message_error = 'Error en el servidor';
          }
        }
      );
    } else {
      this.message_error = 'Por favor complete el formulario correctamente.';
    }
  }
}
