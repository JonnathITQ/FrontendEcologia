import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConsejosService } from '../../services/consejos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consejos',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './consejos.component.html',
  styleUrl: './consejos.component.css'
})
export class ConsejosComponent {
  public consejos: any[] = [];

  constructor(private _consejosService: ConsejosService) {
    this.getConsejos();
  }

  getConsejos() {
    this._consejosService.getConsejos().subscribe(
      response => {
        if (response.consejos) {
          this.consejos = response.consejos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
