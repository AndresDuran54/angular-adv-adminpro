import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos.models';

const base_url = environment.url_prod;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      "x-token": this.token
    };
  }

  constructor(private http: HttpClient){
  }

  obtenerMedico(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<Medico>(
      url, {
        headers: this.headers
      }
    ).pipe(
      map(
        (resp: any) => resp.medico
      )
    );
  }

  obtenerMedicos(){
    const url = `${base_url}/medicos`;
    return this.http.get<Medico[]>(
      url, {
        headers: this.headers
      }
    ).pipe(
      map(
        (resp: any) => resp.medicos
      )
    );
  }

  borrarMedico(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.delete(url, {
      headers: this.headers
    });
  }

  crearMedico(medico: Medico){
    const url = `${base_url}/medicos`;
    return this.http.post(url, 
      medico,
      {
        headers: this.headers
      },
    );
  }

}
