import { Routes } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { Error404Component } from "../pages/error404/error404.component";
import { IndependienteDocumentoComponent } from "./independiente-documento/independiente-documento.component";
import { IndependienteGaleriaComponent } from "./independiente-galeria/independiente-galeria.component";

export const ComponentsRoutes: Routes = [
    { path: 'navbar', component: NavbarComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'independienteDocumento', component: IndependienteDocumentoComponent },
    { path: 'independienteGaleria', component: IndependienteGaleriaComponent },
    { path: '**', component: Error404Component }

]