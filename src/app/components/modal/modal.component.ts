import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public imagen!: File;
  public imgTemp!: any;

  constructor(
    public modalService: ModalServiceService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {

  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalService.cerrarModal();
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
    //reader.result contiene un data: URL que representa los datos del fichero.
    reader.readAsDataURL(this.imagen);
    //Un controlador para el evento loadend. Este evento se activa cada vez que la 
    //operación de lecura se ha completado (ya sea con éxito o fallo).
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  actualizarImagen(){

    const uid = this.modalService.uid;
    const tipo = this.modalService.tipo;

    this.fileUploadService.actualizarFoto(
      tipo,
      uid,
      this.imagen
    ).then(
      (resp) => {
        Swal.fire('Guardado', 'Imagen actualizada con éxito', 'success');
        this.modalService.nuevaImagen.emit(resp.nombreArchivo);
        this.cerrarModal();
      }
    ).catch(
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

}
