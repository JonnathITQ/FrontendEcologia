import { Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ConsejosComponent } from './pages/consejos/consejos.component';
import { DocumentosComponent } from './pages/documentos/documentos.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { TutorialesComponent } from './pages/tutoriales/tutoriales.component';
import { ForoComponent } from './pages/foro/foro.component';
import { ForoIndependienteComponent } from './pages/foro-independiente/foro-independiente.component';

export const routes: Routes = [
    { path: 'components', loadChildren: () => import('./components/components.routes').then(m => m.ComponentsRoutes) },
    { path: 'sesiones', loadChildren: () => import('./sesiones/sesiones.routes').then(m => m.SesionesRoutes) },
    { path: 'usuario', loadChildren: () => import('./usuario/usuario.routes').then(m => m.UsuarioRoutes) },
    { path: 'moderador', loadChildren: () => import('./moderador/moderador.routes').then(m => m.ModeradorRoutes) },
    { path: 'admi', loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes) },
    { path: 'about', component: AboutComponent },
    { path: 'consejos', component: ConsejosComponent },
    { path: 'documentos', component: DocumentosComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'galeria-independiente/:id', loadComponent: () => import('./pages/galeria-independiente/galeria-independiente.component').then(m => m.GaleriaIndependienteComponent) },
    { path: '', component: HomeComponent },
    { path: 'personas', component: PersonasComponent },
    { path: 'tutoriales', component: TutorialesComponent },
    { path: 'foro', component: ForoComponent },
    { path: 'foro/:id', component: ForoIndependienteComponent },
    { path: '**', component: Error404Component }
];
