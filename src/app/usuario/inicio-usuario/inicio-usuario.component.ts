import { Component } from '@angular/core';
import { SidebarUsuarioComponent } from '../sidebar-usuario/sidebar-usuario.component';
import { UsuarioService } from '../../services/usuario.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-usuario',
  imports: [SidebarUsuarioComponent, RouterModule, CommonModule],
  templateUrl: './inicio-usuario.component.html',
  styleUrl: './inicio-usuario.component.css'
})
export class InicioUsuarioComponent {
  public identity: Usuario | null = null;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.identity = this._usuarioService.getIdentity();
  }
}
