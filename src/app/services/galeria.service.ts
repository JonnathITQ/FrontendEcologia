import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBase } from './urlBase';

@Injectable({
    providedIn: 'root'
})
export class GaleriaService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlBase.url;
    }

    getGaleria(): Observable<any> {
        return this._http.get(this.url + 'listagaleria');
    }

    getObra(id: string): Observable<any> {
        return this._http.get(this.url + 'galeria/' + id);
    }

    agregarObra(obra: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'agregargaleria', obra, { headers: headers });
    }

    updateObra(id: string, obra: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'updategaleria/' + id, obra, { headers: headers });
    }

    deleteObra(id: string): Observable<any> {
        return this._http.delete(this.url + 'borrargaleria/' + id);
    }

    subirImagen(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', file);
        return this._http.post(this.url + 'subirImagenGaleria/' + id, formData);
    }

    getUrlImagen(imagen: string): string {
        return this.url + 'verImagenGaleria/' + imagen;
    }
}
