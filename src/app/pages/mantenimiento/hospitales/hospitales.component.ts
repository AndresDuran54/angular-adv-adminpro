import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales!: Hospital[];
  public hospitalesTemp!: Hospital[];
  public cargando: boolean = true;
  public nuevaImagen!: Subscription;

  constructor(
    private hospitalesService: HospitalesService,
    private modalService: ModalServiceService,
    private busquedaService: BusquedasService
  ){

  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.nuevaImagen = this.modalService.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe(
        img => this.cargarHospitales()
      );
  } 

  ngOnDestroy(): void {
    this.nuevaImagen.unsubscribe();    
  }

  cargarHospitales(){
    
    this.cargando = true;

    this.hospitalesService.obtenerHospitales()
      .subscribe(
        (resp) => {
          this.hospitales = resp;
          this.hospitalesTemp = resp;
          this.cargando = false;
        }
      );

  }

  guardarCambios(hospital: Hospital){
    this.hospitalesService.editarHospital(hospital.nombre, hospital._id)
    .subscribe(
      (resp) => {
        Swal.fire(
          'Hospital actualizado correctamente',
          `${hospital.nombre} editado con éxito`,
          'success'
          );
          this.cargarHospitales();
        },
      (error) => {
        Swal.fire(
          'Hospital no actualizado correctamente',
          `${hospital.nombre} no editado con éxito`,
          'error'
        );
      }
    )
  }

  eliminarHospital(hospital: Hospital){
    this.hospitalesService.borrarHospital(hospital._id)
    .subscribe(
      (resp) => {
        Swal.fire(
          'Hospital eliminado correctamente',
          `${hospital.nombre} eliminado con éxito`,
          'success'
          );
          this.cargarHospitales();
        },
      (error) => {
        Swal.fire(
          'Hospital no eliminado correctamente',
          `${hospital.nombre} no eliminado con éxito`,
          'error'
        );
      }
    )
  }

  async crearHospital() {
    const resp = await Swal.fire({
      title: 'Ingresa el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Ingresa el nombre del hospital',
      showCancelButton: true
    });
    
    if(resp.isConfirmed){
      this.hospitalesService.crearHospital(resp.value)
        .subscribe(
          (resp: any) => {
            Swal.fire(
              'Hospital creado correctamente',
              `Creado con éxito`,
              'success'
              );
              this.cargarHospitales();
            },
          (error) => {
            Swal.fire(
              'Hospital no creado correctamente',
              `Creado con éxito`,
              'error'
            );
          }
        )
    }
  }

  cambiarImagen(hospital: Hospital){
    this.modalService.abrirModal(hospital.img, 'hospitales', hospital._id);
  }

  buscarHospitales(termino: string = ''){
    if(termino == ''){
      this.hospitales = this.hospitalesTemp;
    }else{
      this.busquedaService.busquedaHospitales('hospitales', termino)
      .subscribe(
        (resp) => {
          this.hospitales = resp;
        },
        (error) => {
          console.warn(error);
        },
      );
    }
  }



}
