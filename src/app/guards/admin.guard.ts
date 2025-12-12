import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private _adminService: AdminService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        const identity = this._adminService.getIdentity();
        if (this._adminService.loggedIn() && identity && identity.role === 'admin') {
            return true;
        } else {
            this._router.navigate(['/sesiones/loginAdmin']);
            return false;
        }
    }
}
