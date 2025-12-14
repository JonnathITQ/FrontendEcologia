import { Component } from '@angular/core';
import { SidebarModeradorComponent } from '../sidebar-moderador/sidebar-moderador.component';
import { TutorialService } from '../../services/tutorial.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { urlBase } from '../../services/urlBase';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-tutoriales',
  standalone: true,
  imports: [SidebarModeradorComponent, CommonModule, FormsModule],
  templateUrl: './lista-tutoriales.component.html',
  styleUrl: './lista-tutoriales.component.css'
})
export class ListaTutorialesComponent {
  public tutoriales: any[] = [];
  public tutorial: any = {};
  public showModal: boolean = false;
  public isEditing: boolean = false;
  public message_success: string | undefined;
  public message_error: string | undefined;
  public fileToUpload: File | null = null;
  public url = urlBase.url;

  constructor(
    private _tutorialService: TutorialService,
    private _sanitizer: DomSanitizer
  ) {
    this.getTutoriales();
  }

  getTutoriales() {
    this._tutorialService.getTutoriales().subscribe(
      response => {
        if (response.tutoriales) {
          this.tutoriales = response.tutoriales;
          console.log('Tutoriales loaded:', this.tutoriales);
          this.tutoriales.forEach(t => console.log('Video URL:', this.url + 'verVideoTutorial/' + t.video));
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
      this.tutorial = { ...item };
    } else {
      this.isEditing = false;
      this.tutorial = {};
    }
  }

  closeModal() {
    this.showModal = false;
    this.tutorial = {};
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];
  }

  saveTutorial() {
    if (this.isEditing) {
      this._tutorialService.updateTutorial(this.tutorial._id, this.tutorial).subscribe(
        response => {
          if (response.tutorial) {
            if (this.fileToUpload) {
              this.uploadVideo(this.tutorial._id);
            } else {
              this.finishSave('Tutorial actualizado correctamente');
            }
          } else {
            this.message_error = 'Error al actualizar el tutorial';
          }
        },
        error => {
          this.message_error = 'Error en el servidor';
        }
      );
    } else {
      this._tutorialService.agregarTutorial(this.tutorial).subscribe(
        response => {
          if (response.tutorial) {
            if (this.fileToUpload) {
              this.uploadVideo(response.tutorial._id);
            } else {
              this.finishSave('Tutorial creado correctamente');
            }
          } else {
            this.message_error = 'Error al crear el tutorial';
          }
        },
        error => {
          this.message_error = 'Error en el servidor';
        }
      );
    }
  }

  uploadVideo(id: string) {
    this._tutorialService.subirVideo(id, this.fileToUpload!).subscribe(
      response => {
        this.finishSave(this.isEditing ? 'Tutorial actualizado con video' : 'Tutorial creado con video');
      },
      error => {
        this.message_error = 'Error al subir el video';
      }
    );
  }

  finishSave(message: string) {
    this.message_success = message;
    this.getTutoriales();
    this.closeModal();
    setTimeout(() => {
      this.message_success = undefined;
    }, 3000);
  }

  deleteTutorial(id: string) {
    if (confirm('¿Estás seguro de eliminar este tutorial?')) {
      this._tutorialService.deleteTutorial(id).subscribe(
        response => {
          this.getTutoriales();
          this.message_success = 'Tutorial eliminado correctamente';
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
