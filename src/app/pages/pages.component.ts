import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

//Declaramos la función que se encuentra en el documento de
//src/assets/js/custom.js para eliminar el error
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  

  constructor(private settingService: SettingService){}

  ngOnInit(): void {
    customInitFunctions();
  }

}
