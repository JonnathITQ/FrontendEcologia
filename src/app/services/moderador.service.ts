import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { urlBase } from './urlBase';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModeradorService {
    public url = urlBase.url;
    public identity: any;
    public token: any;

    private identitySubject = new BehaviorSubject<any>(null);
    public identity$ = this.identitySubject.asObservable();

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        this.getIdentity();
    }

    login(user: any, gettoken: any = null): Observable<any> {
        let json = user;
        if (gettoken != null) {
            user.gettoken = true;
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'loginModerador', json, { headers: headers }).pipe(
            tap((response: any) => {
                if (response.moderador) {
                    this.identity = response.moderador;
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

    getIdentity() {
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

    update_moderador(id: any, data: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + 'updateModerador/' + id, data, { headers: headers });
    }

    subirImagen(id: any, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', file);
        return this._http.post(this.url + 'subirImagenModerador/' + id, formData);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.identity = null;
        this.identitySubject.next(null);
        this._router.navigate(['/sesiones/seleccion']);
    }
}
