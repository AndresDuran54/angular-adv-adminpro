import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  //Seleccionamos el link con id theme
  private linkTheme = document.querySelector('#theme')!;

  constructor(){
    //Asignamos el link el href si existe en el local storage, si no es así le asignamos
    //la url por default
    //localStorage.getItem('theme') || "./assets/css/colors/default.css" <- igual a ??
    this.linkTheme.setAttribute('href', localStorage.getItem('theme')?? "./assets/css/colors/default.css");
  }

  changeTheme(theme: String){
    //Creamos el url
    const url = `./assets/css/colors/${theme}.css`;
    //Le asignamos el url al href del link seleccionado previamente
    this.linkTheme.setAttribute('href', url);
    //Agregamos la variable theme con el valor url al local storage
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    //Lista de elementos HTML
    const links =document.querySelectorAll(".selector");
    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if(btnThemeUrl == currentTheme){
        elem.classList.add('working');
      }
    });
  }
}
