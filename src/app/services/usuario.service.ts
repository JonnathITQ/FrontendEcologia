import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    public url = 'http://localhost:3600';
    public identity: Usuario | null = null;
    public token: any;

    private identitySubject = new BehaviorSubject<Usuario | null>(null);
    public identity$ = this.identitySubject.asObservable();

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        this.getIdentity(); // Initialize subject with current local storage value
    }

    login(user: any, gettoken: any = null): Observable<any> {
        let json = user;
        if (gettoken != null) {
            user.gettoken = true;
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/loginUsuario', json, { headers: headers }).pipe(
            tap((response: any) => {
                if (response.usuario) {
                    this.identity = response.usuario;
                    this.identitySubject.next(this.identity);
                }
            })
        );
    }

    getToken() {
        let token = localStorage.getItem('token');
        if (token && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getIdentity(): Usuario | null {
        let identity = localStorage.getItem('identity');
        if (identity && identity != "undefined") {
            this.identity = JSON.parse(identity);
        } else {
            this.identity = null;
        }
        this.identitySubject.next(this.identity);
        return this.identity;
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.identity = null;
        this.identitySubject.next(null);
        this._router.navigate(['/sesiones/seleccion']);
    }

    update_usuario(id: any, data: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + '/updateUsuario/' + id, data, { headers: headers });
    }

    get_usuario(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.get(this.url + '/usuario/' + id, { headers: headers });
    }

    registrar(user: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/agregarUsuario', user, { headers: headers });
    }

    subirImagen(id: any, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', file);
        return this._http.post(this.url + '/subirImagenUsuario/' + id, formData);
    }

    verificarEmail(email: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/loginUsuario', { correo: email, contrasenia: 'dummy' }, { headers: headers });
    }

    getUserIdByEmail(email: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/getUserIdByEmail', { correo: email }, { headers: headers });
    }

    actualizarPassword(id: string, password: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + '/resetPassword/' + id, { contrasenia: password }, { headers: headers });
    }
    getUsuarios(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.get(this.url + '/listaUsuario', { headers: headers });
    }

    deleteUsuario(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.delete(this.url + '/borrarUsuario/' + id, { headers: headers });
    }
}
