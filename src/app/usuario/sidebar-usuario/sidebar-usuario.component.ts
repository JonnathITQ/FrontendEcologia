import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-sidebar-usuario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar-usuario.component.html',
  styleUrl: './sidebar-usuario.component.css'
})
export class SidebarUsuarioComponent {
  public identity: Usuario | null = null;
  public isOpen: boolean = true;
  public url: string;

  public timestamp: number = new Date().getTime();

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.url = this._usuarioService.url;
    this._usuarioService.identity$.subscribe(identity => {
      this.identity = identity;
      this.timestamp = new Date().getTime();
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this._usuarioService.logout();
  }
}
