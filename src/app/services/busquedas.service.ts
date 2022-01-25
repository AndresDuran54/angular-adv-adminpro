import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.model';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospitales.models';
import { Medico } from '../models/medicos.models';

const base_url = `${environment.url_prod}`

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) {

  }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      'x-token': this.token
    };
  }

  busquedaGlobal(
    termino: string
  ){
    const url = `${base_url}/todo/${termino}`;
    //http://localhost:3000/api/todo/coleccion/usuarios/a
    return this.http.get<any>(
      url,
      {
        headers: this.headers
      }      
    );
  }

  busquedaUsuarios(
    tipo: 'usuarios' | 'doctores' | 'hospitales',
    termino: string
  ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    //http://localhost:3000/api/todo/coleccion/usuarios/a
    return this.http.get<Usuario[]>(
      url,
      {
        headers: this.headers
      }      
    ).pipe(
      map(
        (resp: any) => {
          const usuarios = resp.resultados.map(
            (u: any) => new Usuario(u.nombre, u.email, u.img, u.role, u.google, u.uid)
          );
          return usuarios;
        }
      )
    );
  }

  busquedaHospitales(
    tipo: 'usuarios' | 'doctores' | 'hospitales',
    termino: string
  ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    //http://localhost:3000/api/todo/coleccion/usuarios/a
    return this.http.get<Hospital[]>(
      url,
      {
        headers: this.headers
      }      
    ).pipe(
      map(
        (resp: any) => {
          const hospitales = resp.resultados.map(
            (u: any) => new Hospital(u._id, u.nombre, u.img, u.usuario)
          );
          return hospitales;
        }
      )
    );
  }

  busquedaMedicos(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    //http://localhost:3000/api/todo/coleccion/usuarios/a
    return this.http.get<Medico[]>(
      url,
      {
        headers: this.headers
      }      
    ).pipe(
      map(
        (resp: any) => {
          const medicos = resp.resultados.map(
            (u: any) => new Medico(u._id, u.nombre, u.img, u.hospital, u.usuario)
          );
          return medicos;
        }
      )
    );
  }
}
