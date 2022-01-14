import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url_prod;

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  public _ocultarModal: boolean = true;
  public imagen!: String;
  public tipo!: 'usuarios' | 'hospitales' | 'medicos';
  public uid!: String;
  //Úselo en componentes con la directiva @Output para emitir eventos 
  //personalizados de forma síncrona o asíncrona, y registre controladores 
  //para esos eventos suscribiéndose a una instancia.
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    imagen: String = 'x',
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    uid: String
  ){
    this.tipo = tipo;
    this.uid = uid;

    if(imagen.includes('https')){
      this.imagen = imagen;
    }else{
      this.imagen = `${base_url}/upload/${tipo}/${imagen}`;
    }

    this._ocultarModal = false;
  }

  cerrarModal(){
    this._ocultarModal = true;
  }
}
