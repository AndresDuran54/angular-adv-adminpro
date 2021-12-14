import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  async ngOnInit() {
    //this.getUsuarios().then((body) => {
    //  console.log(body);
    //});

    console.log(await this.getUsuarios());
    
    // const promesa = new Promise( (resolve, reject) => {
    //   if(false){
    //     resolve("Mensaje desde una promesa");
    //   }else{
    //     reject("Mensaje de error desde una promesa");
    //   }
    // });

    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch(
    //   console.log
    // )
    // .finally( () => {
    //   console.log("Fin de la promesa");
    // });

    // console.log("Fin del Init");
  }

  getUsuarios(): Promise<any>{

    return new Promise( (resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve(body.data) );
    });

  }

}
