import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBase } from './urlBase';

@Injectable({
    providedIn: 'root'
})
export class TutorialService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlBase.url;
    }

    getTutoriales(): Observable<any> {
        return this._http.get(this.url + 'listaTutoriales');
    }

    getTutorial(id: string): Observable<any> {
        return this._http.get(this.url + 'tutorial/' + id);
    }

    agregarTutorial(tutorial: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'agregarTutorial', tutorial, { headers: headers });
    }

    updateTutorial(id: string, tutorial: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'updateTutorial/' + id, tutorial, { headers: headers });
    }

    deleteTutorial(id: string): Observable<any> {
        return this._http.delete(this.url + 'borrarTutorial/' + id);
    }

    subirVideo(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('video', file);
        return this._http.post(this.url + 'subirVideoTutorial/' + id, formData);
    }

    getUrlVideo(video: string): string {
        return this.url + 'verVideoTutorial/' + video;
    }
}
