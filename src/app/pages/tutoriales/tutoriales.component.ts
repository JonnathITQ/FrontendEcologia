import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TutorialService } from '../../services/tutorial.service';
import { urlBase } from '../../services/urlBase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutoriales',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './tutoriales.component.html',
  styleUrl: './tutoriales.component.css'
})
export class TutorialesComponent implements OnInit {
  public tutoriales: any[] = [];
  public url = urlBase.url;

  constructor(private _tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.getTutoriales();
  }

  getTutoriales() {
    this._tutorialService.getTutoriales().subscribe(
      response => {
        if (response.tutoriales) {
          this.tutoriales = response.tutoriales;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
