import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Admin } from '../../models/Admin';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  public user: any = {};
  public token: any;
  public identity: Admin | null = null;
  public message_error: string | undefined;

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) { }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        correo: this.user.email,
        contrasenia: this.user.password
      }

      this._adminService.login(data).subscribe(
        response => {
          console.log('LOGIN RESPONSE:', response);
          if (response.admin == undefined) {
            this.message_error = response.message;
          } else {
            this.token = response.token;
            this.identity = response.admin;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this._router.navigate(['/admi/admin']);
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
