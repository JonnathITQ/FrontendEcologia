import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ModeradorService } from '../services/moderador.service';

@Injectable({
    providedIn: 'root'
})
export class ModeradorGuard implements CanActivate {

    constructor(
        private _moderadorService: ModeradorService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        const identity = this._moderadorService.getIdentity();
        if (this._moderadorService.loggedIn() && identity && identity.role === 'moderator') {
            return true;
        } else {
            this._router.navigate(['/sesiones/loginModerador']);
            return false;
        }
    }
}
