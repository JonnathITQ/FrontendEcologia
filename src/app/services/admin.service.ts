import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { urlBase } from './urlBase';
import { tap } from 'rxjs/operators';

import { Admin } from '../models/Admin';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    public url = urlBase.url;
    public identity: Admin | null = null;
    public token: any;

    private identitySubject = new BehaviorSubject<Admin | null>(null);
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
        return this._http.post(this.url + 'loginAdmin', json, { headers: headers }).pipe(
            tap((response: any) => {
                if (response.admin) {
                    this.identity = response.admin;
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

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.identity = null;
        this.identitySubject.next(null);
        this._router.navigate(['/sesiones/seleccion']);
    }

    // Moderator CRUD
    getModeradores(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.get(this.url + 'listaModerador', { headers: headers });
    }

    createModerador(moderador: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post(this.url + 'agregarModerador', moderador, { headers: headers });
    }

    updateModerador(id: string, moderador: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + 'updateModerador/' + id, moderador, { headers: headers });
    }

    deleteModerador(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.delete(this.url + 'borrarModerador/' + id, { headers: headers });
    }

    // Admin Profile
    updateAdmin(id: string, admin: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + 'updateAdmin/' + id, admin, { headers: headers });
    }

    subirImagen(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', file);
        return this._http.post(this.url + 'subirImagenAdmin/' + id, formData);
    }
}
