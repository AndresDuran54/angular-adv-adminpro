import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

/*
Interfaz que una clase puede implementar para ser un guardia que 
decide si se puede activar una ruta. Si todos los guardias vuelven 
a verdadero, la navegación continúa. Si algún guardia devuelve falso,
 se cancela la navegación. Si algún guardia devuelve un UrlTree, 
 la navegación actual se cancela y comienza una nueva navegación 
 al UrlTree devuelto por el guardia.
*/
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuariosService,
    private router: Router){
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      return this.usuarioService.validarToken()
        .pipe(
          tap(
            estaAutenticado => {
              if(!estaAutenticado){
                this.router.navigateByUrl('/login');
              }
            }
          )
        );
  }
  
}
