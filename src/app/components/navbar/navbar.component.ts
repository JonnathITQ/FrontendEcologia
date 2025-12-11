import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public identity: any;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this._usuarioService.identity$.subscribe(
      identity => {
        this.identity = identity;
      }
    );
  }
}
