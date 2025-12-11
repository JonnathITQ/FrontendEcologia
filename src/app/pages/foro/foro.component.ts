import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ForoService } from '../../services/foro.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  public foro: any[] = [];
  public nuevaObra: any = {
    nombreObra: '',
    descripcion: ''
  };
  public identity: any;
  public url = urlBase.url;
  public fileToUpload: File | null = null;
  public showModal: boolean = false;

  constructor(
    private _foroService: ForoService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.getForo();
  }

  getForo() {
    this._foroService.getForo().subscribe(
      response => {
        if (response.foro) {
          this.foro = response.foro;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit(form: any) {
    if (!this.identity) {
      this.showModal = true;
      return;
    }

    this.nuevaObra.usuario_id = this.identity._id;

    this._foroService.guardarForo(this.nuevaObra).subscribe(
      response => {
        if (response.foro) {
          if (this.fileToUpload) {
            this._foroService.subirImagen(response.foro._id, this.fileToUpload).subscribe(
              result => {
                this.getForo();
                this.resetForm(form);
              },
              error => {
                console.log(error);
              }
            );
          } else {
            this.getForo();
            this.resetForm(form);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  resetForm(form: any) {
    form.reset();
    this.fileToUpload = null;
    this.nuevaObra = { nombreObra: '', descripcion: '' };
  }

  cerrarModal() {
    this.showModal = false;
  }

  irALogin() {
    this.cerrarModal();
    this._router.navigate(['/login-usuario']);
  }

  getImagenUrl(imageName: string): string {
    return this.url + 'verImagenForo/' + imageName;
  }
}
