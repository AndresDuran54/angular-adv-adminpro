import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.models';

const base_url = environment.url_prod;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor( private http: HttpClient ){

  }

  get token(){
    return localStorage.getItem('token') || "";
  }

  get headers(){
    return {
      "x-token": this.token
    }
  }

  obtenerHospitales(): Observable<any>{
    const url = `${base_url}/hospital`;

    return this.http.get<Hospital[]>(
      url,
      {
        headers: this.headers
      }
    ).pipe(
      map(
        (resp: any) => resp.hospitales
      )
    );
  }

  crearHospital(nombre: string): Observable<any>{
    const url = `${base_url}/hospital`;

    return this.http.post<Hospital[]>(
      url, {nombre},
      {
        headers: this.headers,
      },
    ).pipe(
      map(
        (resp: any) => resp.hospital
      )
    );
  }

  editarHospital(nombre: string, idHospital: string): Observable<any>{
    const url = `${base_url}/hospital/${idHospital}`;

    return this.http.put<Hospital[]>(
      url, {nombre},
      {
        headers: this.headers,
      },
    );
  }

  borrarHospital(idHospital: string): Observable<any>{
    const url = `${base_url}/hospital/${idHospital}`;

    return this.http.delete<Hospital[]>(
      url,
      {
        headers: this.headers,
      },
    );
  }
}
