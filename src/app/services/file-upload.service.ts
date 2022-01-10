import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url_prod;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    tipo: 'usuarios' | 'doctores' | 'hospitales',
    uid: String,
    //La interfaz File provee información acerca de los archivos
    //y permite que el código JavaScript en una página web tenga acceso a su contenido.
    file: File
  ){

    const url = `${base_url}/upload/${tipo}/${uid}`;

    //La interfaz FormData proporciona una forma de construir fácilmente
    //un conjunto de pares clave / valor que representan campos de formulario y sus valores
    //https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData();
    formData.append('image', file);

    try{
      const resp = await fetch(
        url,
        {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || '',
          },
          body: formData
        }
      );
      const data = await resp.json();
      return data;
    }catch(err){
      console.log(err);
      return false;
    }

  }
}
