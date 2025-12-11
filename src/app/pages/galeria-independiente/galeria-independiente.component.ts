import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GaleriaService } from '../../services/galeria.service';
import { ComentariosService } from '../../services/comentarios.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-galeria-independiente',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './galeria-independiente.component.html',
  styleUrl: './galeria-independiente.component.css'
})
export class GaleriaIndependienteComponent implements OnInit {
  public obra: any = {};
  public comentarios: any[] = [];
  public identity: any;
  public token: any;
  public nuevoComentario: string = '';
  public showModal: boolean = false;
  public id: string = '';
  public url = urlBase.url;

  constructor(
    private _route: ActivatedRoute,
    private _galeriaService: GaleriaService,
    private _comentariosService: ComentariosService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getObra(this.id);
      this.getComentarios();
    });
  }

  getObra(id: string) {
    this._galeriaService.getObra(id).subscribe(
      response => {
        if (response.obra) {
          this.obra = response.obra;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getComentarios() {
    this._comentariosService.getComentarios().subscribe(
      response => {
        if (response.comentarios) {
          this.comentarios = response.comentarios.filter((c: any) => c.galeria_id && c.galeria_id._id === this.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getImagenUrl(imagen: string): string {
    return this._galeriaService.getUrlImagen(imagen);
  }

  enviarComentario() {
    if (!this.identity) {
      this.showModal = true;
      return;
    }

    if (!this.nuevoComentario.trim()) return;

    let comentario = {
      usuario_id: this.identity._id,
      galeria_id: this.id,
      mensaje: this.nuevoComentario
    };

    this._comentariosService.addComentario(comentario, this.token).subscribe(
      response => {
        if (response.comentario) {
          this.nuevoComentario = '';
          this.getComentarios();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cerrarModal() {
    this.showModal = false;
  }

  irALogin() {
    this.cerrarModal();
    this._router.navigate(['/sesiones/seleccion']);
  }

  goBack() {
    this._router.navigate(['/galeria']);
  }
}
