import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ModeradorService } from '../../services/moderador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-moderador',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login-moderador.component.html',
  styleUrl: './login-moderador.component.css'
})
export class LoginModeradorComponent {
  public user: any = {};
  public token: any;
  public identity: any;
  public message_error: string | undefined;

  constructor(
    private _moderadorService: ModeradorService,
    private _router: Router
  ) { }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        correo: this.user.email,
        contrasenia: this.user.password
      }

      this._moderadorService.login(data).subscribe(
        response => {
          console.log('LOGIN RESPONSE:', response);
          if (response.moderador == undefined) {
            this.message_error = response.message;
          } else {
            this.token = response.token;
            this.identity = response.moderador;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            this._router.navigate(['/moderador']);
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
