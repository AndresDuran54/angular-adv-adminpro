import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const url_prod = environment.url_prod;
declare const gapi : any;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  public auth2: any;

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

  validarToken(): Observable<any>{
    const token = localStorage.getItem('token') || '';

    return this.httpClient.get(`${url_prod}/login/renew`, {
      headers: {
        "x-token": token
      }
    })
      .pipe(
        //Solamente se ejecuta si no ocurrio un error
        tap(
          resp => localStorage.setItem('token', token)
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
}
