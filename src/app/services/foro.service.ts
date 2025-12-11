import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBase } from './urlBase';

@Injectable({
    providedIn: 'root'
})
export class ForoService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlBase.url;
    }

    getForo(): Observable<any> {
        return this._http.get(this.url + 'listaForo');
    }

    guardarForo(foro: any): Observable<any> {
        let params = JSON.stringify(foro);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardarForo', params, { headers: headers });
    }

    subirImagen(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', file);
        return this._http.post(this.url + 'subirImagenForo/' + id, formData);
    }
}
