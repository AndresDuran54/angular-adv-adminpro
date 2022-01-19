import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.models';
import { Medico } from 'src/app/models/medicos.models';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospital?: Hospital;
  public medico?: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalesService,
    private medicoService: MedicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(
        (params) => {
          console.log(params);
          this.seleccionarMedico(params.id)
        }
      )
    
    this.medicoForm = this.fb.group(
      {
        nombre: [
          "",
          [
            Validators.required
          ]
        ],
        hospital: [
          "",
          [
            Validators.required
          ]
        ]
      }
    )

    this.obtenerHospitales();

  }

  seleccionarMedico(id: string){
    this.medicoService.obtenerMedico(id)
      .pipe(
        delay(100)
      )
      .subscribe(
        medico => {
          this.medico = medico;
          this.hospital = this.medico?.hospital;
          this.medicoForm.setValue({nombre: this.medico?.nombre, hospital: this.hospital?._id})
        },
        error => {
          this.router.navigateByUrl(`dashboard/medicos`);
        }
      )
  }

  obtenerHospitales(){
    this.hospitalService.obtenerHospitales()
      .subscribe(
        (hospitales) => this.hospitales = hospitales,
        (error) => this.hospitales = []
      );

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(
        (hospitalId) => {
          console.log(hospitalId);
          this.hospital = this.hospitales.find(h => h._id == hospitalId);
        }
      )
        
  }

  enviar(){
    if(this.medicoForm.valid){
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe(
          (resp: any) => {
            this.router.navigateByUrl(`dashboard/medico/${resp.medico._id}`);
          },
          console.warn
        )
    }
  }

}
