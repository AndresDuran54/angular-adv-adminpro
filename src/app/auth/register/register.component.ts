import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  formSubmitted : boolean = false;

  //Creamos un Form Group -> Realiza un seguimiento del valor y el estado de validez de un grupo de instancias de FormControl.
  public registerForm = this.fb.group(
    {
      //Con los datos quie ingresemos al array se creara un Form Control
      /*
        Form Control -> Realiza un seguimiento del valor y el estado de 
        validación de un campo de un formulario.
      */
      nombre: [
        //Valor por defecto de input
        'Andrés',
        //validadores
        Validators.required,
      ],
      email: [
        'test100@test.com',
        [
          Validators.required,
          Validators.email
        ],
      ],
      password: [
        '123456',
        Validators.required
      ],
      password2: [
        '123456',
        Validators.required
      ],
      terminos: [
        false,
        [
          Validators.required,
        ]
      ]
    },
    {
      validators: this.passwordsIguales2
    }
  );

  /*
    FormBuilder acorta la creación de 
    instancias de FormControl, FormGroup o FormArray
  */
  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router) { 
  }

  crearUsuario(){

    this.formSubmitted = true;

    console.log(this.registerForm.value);
    console.log(this.registerForm.get('password'));

    if(!this.registerForm.valid){
      return 
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(
        (resp) => {
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
        () => {
          console.log("Petición terminada");
        }
      )
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasIguales(){
    return (this.registerForm.get('password')?.value != this.registerForm.get('password2')?.value)
            && this.formSubmitted;
  }

  campoValido(campo: string): boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }
    return false;
  }

  //Proporciona algunos de los comportamientos compartidos que tienen todos los controles y 
  //grupos de controles, como ejecutar validadores, calcular el estado y restablecer el estado. 
  //También define las propiedades que se comparten entre todas las subclases, como valor, 
  //válido y sucio. No se debe crear una instancia directamente.
  passwordsIguales2(control: AbstractControl): ValidationErrors | null {
    //.get() Recupera un control secundario dado el nombre o la ruta del control.
    const password = control.get("password");
    const password2 = control.get("password2");

    return (password?.value == password2?.value) ? null : {
      noSonIguales: true
    }
  }
}
