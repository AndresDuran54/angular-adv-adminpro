import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public formGroup!: FormGroup;
  public usuario: Usuario;
  public imagen!: File;
  public imgTemp!: any;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private fileUploadService: FileUploadService) { 
      this.usuario = usuarioService.usuario!;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        nombre: [
          this.usuario.nombre,
          Validators.required
        ],
        email: [
          this.usuario.email,
          [
            Validators.required,
            Validators.email
          ]
        ]
      }
    )
  }

  actualizarDatos(){
    this.usuarioService.actualizarDatos(this.formGroup.value)
      .subscribe(
        (resp:any) => {
          this.usuario.nombre = resp.usuario.nombre;
          this.usuario.email = resp.usuario.email;

          Swal.fire('Guardado', 'Datos actualizados con éxito', 'success');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
        
      );
  }

  cambioImagen($event: any){
    //files -> FileList
    //Un objeto de este tipo es devuelto por la propiedad files; 
    //esto le permite acceder a la lista de archivos seleccionados
    //con el elemento <input type = "file">.
    //https://developer.mozilla.org/en-US/docs/Web/API/FileList
    this.imagen = $event.target.files[0];
    //this.imagen será null cuando el usuario de a cancelar al seleccionar
    //el archivo
    if(!this.imagen){
      this.imgTemp = null;
      return;
    }
    //El objeto FileReader permite que las aplicaciones web lean ficheros 
    //(o información en buffer) almacenados en el cliente de forma asíncrona,
    //usando los objetos File o Blob dependiendo de los datos que se pretenden leer.
    const reader = new FileReader();
    //Comienza la lectura del contenido del objeto Blob, una vez terminada, el atributo
    //result contiene un data: URL que representa los datos del fichero.
    reader.readAsDataURL(this.imagen);
    //Un controlador para el evento loadend. Este evento se activa cada vez que la 
    //operación de lecura se ha completado (ya sea con éxito o fallo).
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  actualizarImagen(){
    this.fileUploadService.actualizarFoto(
      'usuarios',
      this.usuario.uid!,
      this.imagen
    ).then(
      (resp) => {
        this.usuario.img = resp.nombreArchivo;
        Swal.fire('Guardado', 'Imagen actualizada con éxito', 'success');
      }
    ).catch(
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

}
