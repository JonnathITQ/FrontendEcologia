import { Routes } from "@angular/router";
import { SeleccionComponent } from "./seleccion/seleccion.component";
import { LoginUsuarioComponent } from "./login-usuario/login-usuario.component";
import { LoginModeradorComponent } from "./login-moderador/login-moderador.component";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { Error404Component } from "../pages/error404/error404.component";
import { RegistrarUsuarioComponent } from "./registrar-usuario/registrar-usuario.component";
import { RecuperarContraseniaComponent } from "./recuperar-contrasenia/recuperar-contrasenia.component";

export const SesionesRoutes: Routes = [
    { path: 'seleccion', component: SeleccionComponent },
    { path: 'loginUsuario', component: LoginUsuarioComponent },
    { path: 'loginModerador', component: LoginModeradorComponent },
    { path: 'loginAdministrador', component: LoginAdminComponent },
    { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
    { path: 'recuperarContraUsuario', component: RecuperarContraseniaComponent },
    { path: '**', component: Error404Component },

]