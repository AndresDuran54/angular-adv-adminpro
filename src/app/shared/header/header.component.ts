import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public usuario: Usuario;

  constructor(
    private usuarioService: UsuariosService
  ) { 
    this.usuario = usuarioService.usuario!;
  }

  logout(){
    this.usuarioService.logout();
  }

}
