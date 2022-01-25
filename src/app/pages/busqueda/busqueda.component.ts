import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospitales.models';
import { Medico } from 'src/app/models/medicos.models';
import { Usuario } from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public usuarios: Usuario[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public busquedaService: BusquedasService
  ) { }

  ngOnInit(): void { 
    this.activatedRoute.params.
      subscribe(
        ({termino}) => {
          this.busquedaGlobal(termino);
        }
      )
  }

  busquedaGlobal(termino: string){
    this.busquedaService.busquedaGlobal(termino)
      .subscribe(
        (resp) => {
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          this.usuarios = resp.usuarios;
        }
      )
  }
}
