import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url_prod;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string): unknown {
        
    if(!img){
      return `${base_url}/upload/${tipo}/no-image`;
    }else if(img?.includes('https')){
        return img;
    }else if(img){
        return `${base_url}/upload/${tipo}/${img}`;
    }else{
        return `${base_url}/upload/${tipo}/no-image`;
    }
  }

}
