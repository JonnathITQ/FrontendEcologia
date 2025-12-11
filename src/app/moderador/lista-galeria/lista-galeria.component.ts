import { Component } from '@angular/core';
import { SidebarModeradorComponent } from '../sidebar-moderador/sidebar-moderador.component';
import { GaleriaService } from '../../services/galeria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-lista-galeria',
  standalone: true,
  imports: [SidebarModeradorComponent, CommonModule, FormsModule],
  templateUrl: './lista-galeria.component.html',
  styleUrl: './lista-galeria.component.css'
})
export class ListaGaleriaComponent {
  public galeria: any[] = [];
  public obra: any = {};
  public showModal: boolean = false;
  public isEditing: boolean = false;
  public message_success: string | undefined;
  public message_error: string | undefined;
  public fileToUpload: File | null = null;
  public url = urlBase.url;

  constructor(private _galeriaService: GaleriaService) {
    this.getGaleria();
  }

  getGaleria() {
    this._galeriaService.getGaleria().subscribe(
      response => {
        if (response.galeria) {
          this.galeria = response.galeria;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openModal(item: any = null) {
    this.showModal = true;
    this.message_error = undefined;
    this.fileToUpload = null;
    if (item) {
      this.isEditing = true;
      this.obra = { ...item };
    } else {
      this.isEditing = false;
      this.obra = {};
    }
  }

  closeModal() {
    this.showModal = false;
    this.obra = {};
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];
  }

  saveObra() {
    if (this.isEditing) {
      this._galeriaService.updateObra(this.obra._id, this.obra).subscribe(
        response => {
          if (response.galeria) {
            if (this.fileToUpload) {
              this.uploadImage(this.obra._id);
            } else {
              this.finishSave('Obra actualizada correctamente');
            }
          } else {
            this.message_error = 'Error al actualizar la obra';
          }
        },
        error => {
          this.message_error = 'Error en el servidor';
        }
      );
    } else {
      this._galeriaService.agregarObra(this.obra).subscribe(
        response => {
          if (response.galeria) {
            if (this.fileToUpload) {
              this.uploadImage(response.galeria._id);
            } else {
              this.finishSave('Obra creada correctamente');
            }
          } else {
            this.message_error = 'Error al crear la obra';
          }
        },
        error => {
          this.message_error = 'Error en el servidor';
        }
      );
    }
  }

  uploadImage(id: string) {
    this._galeriaService.subirImagen(id, this.fileToUpload!).subscribe(
      response => {
        this.finishSave(this.isEditing ? 'Obra actualizada con imagen' : 'Obra creada con imagen');
      },
      error => {
        this.message_error = 'Error al subir la imagen';
      }
    );
  }

  finishSave(message: string) {
    this.message_success = message;
    this.getGaleria();
    this.closeModal();
    setTimeout(() => {
      this.message_success = undefined;
    }, 3000);
  }

  deleteObra(id: string) {
    if (confirm('¿Estás seguro de eliminar esta obra?')) {
      this._galeriaService.deleteObra(id).subscribe(
        response => {
          this.getGaleria();
          this.message_success = 'Obra eliminada correctamente';
          setTimeout(() => {
            this.message_success = undefined;
          }, 3000);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
