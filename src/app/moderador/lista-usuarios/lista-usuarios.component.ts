import { Component } from '@angular/core';
import { SidebarModeradorComponent } from '../sidebar-moderador/sidebar-moderador.component';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [SidebarModeradorComponent, CommonModule, FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  public usuarios: any[] = [];
  public message_success: string | undefined;
  public message_error: string | undefined;
  public url = urlBase.url;
  public showDeleteModal: boolean = false;
  public userToDelete: string | null = null;

  constructor(private _usuarioService: UsuarioService) {
    this.getUsuarios();
  }

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(
      response => {
        if (response.usuarios) {
          this.usuarios = response.usuarios;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openDeleteModal(id: string) {
    this.userToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  confirmDelete() {
    if (this.userToDelete) {
      this._usuarioService.deleteUsuario(this.userToDelete).subscribe(
        response => {
          this.getUsuarios();
          this.message_success = 'Usuario eliminado correctamente';
          this.closeDeleteModal();
          setTimeout(() => {
            this.message_success = undefined;
          }, 3000);
        },
        error => {
          console.log(error);
          this.message_error = 'Error al eliminar el usuario';
          this.closeDeleteModal();
        }
      );
    }
  }
}
