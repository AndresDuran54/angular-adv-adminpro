import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario: Usuario; 
  
  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuariosService){
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario!;
  }

  ngOnInit(): void {
  }

}
