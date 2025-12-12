import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBase } from './urlBase';

@Injectable({
    providedIn: 'root'
})
export class VisitaService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlBase.url;
    }

    registrarVisita(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'registrarVisita', {}, { headers: headers });
    }

    obtenerVisitas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'obtenerVisitas', { headers: headers });
    }
}
