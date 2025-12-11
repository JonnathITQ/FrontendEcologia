import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GaleriaService } from '../../services/galeria.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit {
  public galeria: any[] = [];
  public activeIndex: number = 0;

  constructor(
    private _galeriaService: GaleriaService,
    private _router: Router
  ) { }

  ngOnInit(): void {
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

  getImagenUrl(imagen: string): string {
    return this._galeriaService.getUrlImagen(imagen);
  }

  next() {
    if (this.activeIndex < this.galeria.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0; // Loop back to start
    }
  }

  prev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.galeria.length - 1; // Loop to end
    }
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  verDetalles(id: string) {
    this._router.navigate(['/galeria-independiente', id]);
  }
}
