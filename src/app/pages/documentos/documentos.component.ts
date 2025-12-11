import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DocumentosService } from '../../services/documentos.service';
import { CommonModule } from '@angular/common';
import { urlBase } from '../../services/urlBase';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent {
  public documentos: any[] = [];
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
}
