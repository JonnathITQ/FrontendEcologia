import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  public identity: any;
  public token: any;
  public url = urlBase.url;
  public isOpen: boolean = true;

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.identity = this._adminService.getIdentity();
    this.token = this._adminService.getToken();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this._adminService.logout();
    this._router.navigate(['/sesiones/loginAdministrador']);
  }
}
