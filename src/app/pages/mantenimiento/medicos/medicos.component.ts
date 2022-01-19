import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medicos.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos!: Medico[];
  public medicosTemp!: Medico[];
  public cargando: boolean = true;
  public imagenNueva!: Subscription;

  constructor(
    private medicosService: MedicosService,
    private modalService: ModalServiceService,
    private busquedaService: BusquedasService
  ){
    this.obtenerMedicos();
  }

  ngOnInit(): void {
    this.imagenNueva = this.modalService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe(
        resp => this.obtenerMedicos()
      );
  }

  obtenerMedicos(){
    this.cargando = true;

    this.medicosService.obtenerMedicos()
      .subscribe(
        (medicos) => {
          this.medicos = medicos;
          this.medicosTemp = medicos;
          this.cargando = false;
        },
        console.warn
      )
  }

  actualizarImagen(medico: Medico){
    this.modalService.abrirModal(medico.img, 'medicos', medico._id);
  }

  buscar(termino: string){
    if(termino == ""){
      this.medicos = this.medicosTemp;
      return; 
    }

    this.busquedaService.busquedaMedicos('medicos', termino)
      .subscribe(
        (resp: any) => {
          this.medicos = resp;
        }
      )
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: `¿Deseas eliminar a ${medico.nombre}?`,
      text: "No hay marcha a atras",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedico(medico._id)
          .subscribe(
            (resp) => {
              Swal.fire(
                'Medico eliminado correctamente',
                `${medico.nombre} ha sido eliminado`,
                'success'
                );
                this.obtenerMedicos();
              }
            );
      }
    }).catch(
      (err) => {
        Swal.fire(
          'Medico no eliminado correctamente',
          `${medico.nombre} no ha sido eliminado`,
          'error'
        );
      }
    );
  }
}
