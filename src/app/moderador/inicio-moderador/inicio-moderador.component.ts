import { Component } from '@angular/core';
import { SidebarModeradorComponent } from '../sidebar-moderador/sidebar-moderador.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-moderador',
  standalone: true,
  imports: [SidebarModeradorComponent, CommonModule],
  templateUrl: './inicio-moderador.component.html',
  styleUrl: './inicio-moderador.component.css'
})
export class InicioModeradorComponent {

}
