import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBase } from './urlBase';

@Injectable({
    providedIn: 'root'
})
export class DocumentosService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlBase.url;
    }

    getDocumentos(): Observable<any> {
        return this._http.get(this.url + 'listaDoc');
    }

    getDocumento(id: string): Observable<any> {
        return this._http.get(this.url + 'documento/' + id);
    }

    agregarDocumento(documento: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardarDoc', documento, { headers: headers });
    }

    updateDocumento(id: string, documento: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'updateDoc/' + id, documento, { headers: headers });
    }

    deleteDocumento(id: string): Observable<any> {
        return this._http.delete(this.url + 'eliminarDoc/' + id);
    }

    subirArchivo(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('documento', file); // Backend expects 'documento'
        return this._http.post(this.url + 'subirDocumento/' + id, formData);
    }
}
