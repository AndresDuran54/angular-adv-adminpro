import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
/*
Interfaz que una clase puede implementar para ser un guardia decidiendo si
se puede activar una ruta. Si todos los guardias devuelven verdadero,
la navegación continúa. Si algún guardia devuelve falso, se cancela la
navegación. Si algún guardia devuelve un UrlTree, la navegación actual se 
cancela y comienza una nueva navegación al UrlTree devuelto por el guardia.
*/
export class RolGuard implements CanActivate {

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.usuarioService.usuario);
    if(this.usuarioService.role == "ADMIN_ROL"){
      return true;
    }else{
      const tree2: UrlTree = this.router.parseUrl('/login');
      
      return tree2;
    }

  }
  
}
