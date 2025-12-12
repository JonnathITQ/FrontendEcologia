import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { VisitaService } from '../../services/visita.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private _visitaService: VisitaService) { }

  ngOnInit(): void {
  }

  copyLink() {
    const url = 'http://localhost:4200/';
    navigator.clipboard.writeText(url).then(() => {
      // Registrar visita
      this._visitaService.registrarVisita().subscribe(
        response => {
          console.log('Visita registrada');
        },
        error => {
          console.log('Error al registrar visita', error);
        }
      );

      Swal.fire({
        icon: 'success',
        title: '¡Enlace copiado!',
        text: 'El enlace ha sido copiado al portapapeles.',
        timer: 2000,
        showConfirmButton: false
      });
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo copiar el enlace.',
      });
    });
  }
}
