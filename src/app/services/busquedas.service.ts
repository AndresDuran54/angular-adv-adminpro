import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.model';
import { map } from 'rxjs/operators';

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
}
