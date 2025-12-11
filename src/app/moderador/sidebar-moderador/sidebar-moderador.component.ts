import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ModeradorService } from '../../services/moderador.service';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-sidebar-moderador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-moderador.component.html',
  styleUrl: './sidebar-moderador.component.css'
})
export class SidebarModeradorComponent {
  public identity: any;
  public token: any;
  public url = urlBase.url;
  public isOpen: boolean = true;

  constructor(
    private _moderadorService: ModeradorService,
    private _router: Router
  ) {
    this.identity = this._moderadorService.getIdentity();
    this.token = this._moderadorService.getToken();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this._moderadorService.logout();
    this._router.navigate(['/sesiones/login-moderador']);
  }
}
