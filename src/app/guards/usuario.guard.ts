import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        if (!this._usuarioService.loggedIn()) {
            this._router.navigate(['/sesiones/loginUsuario']);
            return false;
        }
        return true;
    }
}
