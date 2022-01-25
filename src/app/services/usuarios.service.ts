import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import { CargarUsuarios } from '../models/cargarUsuarios.model';

const url_prod = environment.url_prod;
declare const gapi : any;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  public auth2: any;
  public usuario: Usuario | undefined;

  get role(){
    return this.usuario?.role ?? "USER_ROL";
  }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.usuario?.uid || '';
  }

  get headers(){
    return {
      'x-token': this.token
    }
  }

  constructor(private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.startApp();
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '921238640771-jbevf8hnm5bvf5m1h1mlt6v5np779opf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  };

  actualizarDatos(data: {
    nombre: String,
    email: String,
    role?: String
  }): Observable<any>{

    data.role = this.usuario?.role || 'USER_ROLE';

    return this.httpClient.put(`${url_prod}/usuarios/${this.uid}`, data,{
      headers: {
        "x-token": this.token
      }
    });
  }

  validarToken(): Observable<any>{

    return this.httpClient.get(`${url_prod}/login/renew`, {
      headers: {
        "x-token": this.token
      }
    })
      .pipe(
        //Solamente se ejecuta si no ocurrio un error
        tap(
          (resp:any) => {
            localStorage.setItem('token', resp.token);

            const  {
              email,
              google,
              img,
              nombre,
              role,
              uid
            } = resp.usuario;

            this.usuario = new Usuario(nombre, email, img, role, google, uid);
          }
        ),
        map(
          resp => true
        ),
        catchError(
          resp => of(false)
        )
      );
  }

  crearUsuario(formData: RegisterForm): Observable<any>{
    
    return this.httpClient.post(`${url_prod}/usuarios`, formData)
      .pipe(
        tap(
          (resp:any) => {
            localStorage.setItem('token', resp.token);
          }
        )
      );
  }

  login(formData: LoginForm): Observable<any>{
    return this.httpClient.post(`${url_prod}/login`, formData)
      .pipe(
        //tap es un operador que nos permite hacer
        //un procedimiento previo, como por ejemplo
        //aquí guardaremos en local storage el token
        //y tbm se puede codificar lo que resuleve el observable
        tap(
          (resp:any) => {
            localStorage.setItem('token', resp.token);
          }
        )
      );
  }

  loginGoogle(token:string): Observable<any>{
    return this.httpClient.post(`${url_prod}/login/google`, {token})
      .pipe(
        //tap es un operador que nos permite hacer
        //un procedimiento previo, como por ejemplo
        //aquí guardaremos en local storage el token
        //y tbm se puede codificar lo que resuleve el observable
        tap(
          (resp:any) => {
            localStorage.setItem('token', resp.token);
          }
        )
      );
  }

  obtenerUsuarios(desde?: number){
    return this.httpClient.get<CargarUsuarios>(
      `${url_prod}/usuarios?desde=${desde}`,
      {
        headers: this.headers
      }
    ).pipe(
      map(
        (resp) => {

          const usuarios = resp.usuarios.map(
            u => new Usuario(u.nombre, u.email, u.img, u.role, u.google, u.uid)
          )

          return {
            usuarios,
            total: resp.total
          }
        }
      )
    )

  }

  elimarUsuario(uid: String){

    return this.httpClient.delete(
      `${url_prod}/usuarios/${uid}`,
      {
        headers: this.headers
      }
    );

  }

  actualizarUsuario(usuario: Usuario): Observable<any>{

    return this.httpClient.put(`${url_prod}/usuarios/${usuario.uid}`, usuario, 
    {
      headers: this.headers
    });
  }
}
