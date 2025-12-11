import { Routes } from "@angular/router";
import { InicioUsuarioComponent } from "./inicio-usuario/inicio-usuario.component";
import { Error404Component } from "../pages/error404/error404.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { SidebarUsuarioComponent } from "./sidebar-usuario/sidebar-usuario.component";
import { UsuarioGuard } from "../guards/usuario.guard";

export const UsuarioRoutes: Routes = [
    { path: '', component: InicioUsuarioComponent, canActivate: [UsuarioGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [UsuarioGuard] },
    { path: 'sidebar', component: SidebarUsuarioComponent, canActivate: [UsuarioGuard] },
    { path: '**', component: Error404Component },
]