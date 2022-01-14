import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public total!: number;
  public usuarios!: Usuario[];
  public usuariosTemp!: Usuario[];
  public desde: number = 0;
  public cargando!: boolean;

  constructor(
    private usuarioService: UsuariosService,
    private busquedasService: BusquedasService,
    public modalService: ModalServiceService
  ){}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.modalService.nuevaImagen
      .pipe(
        delay(200)
      )
      .subscribe(
        (resp) => {
          this.cargarUsuarios();
        }
      )
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.obtenerUsuarios(this.desde)
      .subscribe(
        ({total, usuarios}) => {
          this.total = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
    );
  }

  cambiarDesde(valor: number){

    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0;
      return;
    }else if(this.desde >= this.total ){
      this.desde -= valor;
      return;
    }
    this.cargarUsuarios();

  }

  buscar(termino: string){
    if(termino == ""){
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedasService.busquedaUsuarios('usuarios', termino )
      .subscribe(
        (resp) => this.usuarios = resp
      );
  }

  borrarUsuario(usuario: Usuario){
    if(usuario.uid == this.usuarioService.uid){
      Swal.fire(
        'Acción no permitida',
        `No puede autoeliminarse`,
        'error'
      );
      return;
    }

    Swal.fire({
      title: `¿Deseas eliminar a ${usuario.nombre}?`,
      text: "No hay marcha a atras",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.elimarUsuario(usuario.uid!)
          .subscribe(
            (resp) => {
              Swal.fire(
                'Usuario eliminado correctamente',
                `${usuario.nombre} ha sido eliminado`,
                'success'
                );
                this.cargarUsuarios();
              }
            );
      }
    }).catch(
      (err) => {
        Swal.fire(
          'Usuario no eliminado correctamente',
          `${usuario.nombre} no ha sido eliminado`,
          'error'
        );
      }
    );
  }

  actualizarRole(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario)  
      .subscribe(
        console.log,
        console.warn
      );
  }

  abrirModal(usuario: Usuario){
    this.modalService.abrirModal(usuario.img, 'usuarios', usuario.uid!);
  }

}
