import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-tutoriales',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './tutoriales.component.html',
  styleUrl: './tutoriales.component.css'
})
export class TutorialesComponent {

}
