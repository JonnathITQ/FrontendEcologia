import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBase } from './urlBase';

@Injectable({
    providedIn: 'root'
})
export class ComentariosService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlBase.url;
    }

    getComentarios(): Observable<any> {
        return this._http.get(this.url + 'listaComentarios');
    }

    addComentario(comentario: any, token: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(comentario);
        return this._http.post(this.url + 'guardarComentarios', params, { headers: headers });
    }
}
