import { Component } from '@angular/core';
import { SidebarModeradorComponent } from '../sidebar-moderador/sidebar-moderador.component';
import { DocumentosService } from '../../services/documentos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-lista-documentos',
  standalone: true,
  imports: [SidebarModeradorComponent, CommonModule, FormsModule],
  templateUrl: './lista-documentos.component.html',
  styleUrl: './lista-documentos.component.css'
})
export class ListaDocumentosComponent {
  public documentos: any[] = [];
  public documento: any = {};
  public showModal: boolean = false;
  public isEditing: boolean = false;
  public message_success: string | undefined;
  public message_error: string | undefined;
  public url = urlBase.url;

  constructor(private _documentosService: DocumentosService) {
    this.getDocumentos();
  }

  getDocumentos() {
    this._documentosService.getDocumentos().subscribe(
      response => {
        if (response.documentos) {
          this.documentos = response.documentos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openModal(doc: any = null) {
    this.showModal = true;
    this.message_error = undefined;
    if (doc) {
      this.isEditing = true;
      this.documento = { ...doc };
    } else {
      this.isEditing = false;
      this.documento = {};
    }
  }

  closeModal() {
    this.showModal = false;
    this.documento = {};
  }

  saveDocumento() {
    if (this.isEditing) {
      this._documentosService.updateDocumento(this.documento._id, this.documento).subscribe(
        response => {
          if (response.documento) {
            this.finishSave('Documento actualizado correctamente');
          } else {
            this.message_error = 'Error al actualizar el documento';
          }
        },
        error => {
          this.message_error = 'Error en el servidor';
        }
      );
    } else {
      this._documentosService.agregarDocumento(this.documento).subscribe(
        response => {
          if (response.documento) {
            this.finishSave('Documento creado correctamente');
          } else {
            this.message_error = 'Error al crear el documento';
          }
        },
        error => {
          this.message_error = 'Error en el servidor';
        }
      );
    }
  }

  finishSave(message: string) {
    this.message_success = message;
    this.getDocumentos();
    this.closeModal();
    setTimeout(() => {
      this.message_success = undefined;
    }, 3000);
  }

  deleteDocumento(id: string) {
    if (confirm('¿Estás seguro de eliminar este documento?')) {
      this._documentosService.deleteDocumento(id).subscribe(
        response => {
          this.getDocumentos();
          this.message_success = 'Documento eliminado correctamente';
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
