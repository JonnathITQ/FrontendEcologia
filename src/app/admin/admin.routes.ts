import { Routes } from "@angular/router";
import { InicioAdminComponent } from "./inicio-admin/inicio-admin.component";
import { ListaModeradoresComponent } from "./lista-moderadores/lista-moderadores.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { SidebarAdminComponent } from "./sidebar-admin/sidebar-admin.component";
import { PerfilAdminComponent } from "./perfil-admin/perfil-admin.component";

export const AdminRoutes: Routes = [
    { path: 'admin', component: InicioAdminComponent },
    { path: 'estadistica', component: EstadisticaComponent },
    { path: 'crudModeradores', component: ListaModeradoresComponent },
    { path: 'sidebarAdmin', component: SidebarAdminComponent },
    { path: 'perfilAdmin', component: PerfilAdminComponent },
    { path: '**', component: InicioAdminComponent },
]