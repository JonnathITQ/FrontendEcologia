import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ForoService } from '../../services/foro.service';
import { ComentariosService } from '../../services/comentarios.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-foro-independiente',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './foro-independiente.component.html',
  styleUrl: './foro-independiente.component.css'
})
export class ForoIndependienteComponent implements OnInit {
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
    private _foroService: ForoService,
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
    this._foroService.getForo().subscribe(
      response => {
        if (response.foro) {
          // Since we don't have getObraById in service yet, we filter from the list
          // Ideally we should add getForoById to service
          this.obra = response.foro.find((item: any) => item._id === id);
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
          this.comentarios = response.comentarios.filter((c: any) => c.foro_id && c.foro_id._id === this.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getImagenUrl(imagen: string): string {
    return this.url + 'verImagenForo/' + imagen;
  }

  enviarComentario() {
    if (!this.identity) {
      this.showModal = true;
      return;
    }

    if (!this.nuevoComentario.trim()) return;

    let comentario = {
      usuario_id: this.identity._id,
      foro_id: this.id,
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
    this._router.navigate(['/foro']);
  }
}
