import { Routes } from "@angular/router";
import { InicioModeradorComponent } from "./inicio-moderador/inicio-moderador.component";
import { ListaDocumentosComponent } from "./lista-documentos/lista-documentos.component";
import { ListaGaleriaComponent } from "./lista-galeria/lista-galeria.component";
import { ListaTutorialesComponent } from "./lista-tutoriales/lista-tutoriales.component";
import { ListaUsuariosComponent } from "./lista-usuarios/lista-usuarios.component";

import { SidebarUsuarioComponent } from "../usuario/sidebar-usuario/sidebar-usuario.component";
import { PerfilModeradorComponent } from "./perfil-moderador/perfil-moderador.component";
import { Error404Component } from "../pages/error404/error404.component";

export const ModeradorRoutes: Routes = [
    { path: '', component: InicioModeradorComponent },
    { path: 'listaDocs', component: ListaDocumentosComponent },
    { path: 'listaGaleria', component: ListaGaleriaComponent },
    { path: 'listaTutoriales', component: ListaTutorialesComponent },
    { path: 'listaUsuarios', component: ListaUsuariosComponent },
    { path: 'perfilModerador', component: PerfilModeradorComponent },
    { path: 'sidebar', component: SidebarUsuarioComponent },
    { path: '**', component: Error404Component },
]