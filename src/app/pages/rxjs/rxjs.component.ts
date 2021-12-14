import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor(){ 
    /*
    //Pipe es un método de los Observables que me permite encadenarle operadores. (map, retry, por ejemplo)
    this.retornarObsevable().pipe(
      //retry -> si nosotros en al instancia de nuestro observable mandamos un observer.error(), lo que hará
      //el retry, es volver a intentar recibir un valor del observable, de volver a recibir un valor se pasara a ejecutar
      //la función de emit, podemos indicar el número de intentos en este caso 1
      retry(1)
    ).subscribe(
      //función de emit
      console.log,
      //functión de error
      console.warn,
      //función de complete
      () => {
        console.log("Obs terminado");
      }
    ); 
    */
    this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        console.log
      );
  }
  ngOnDestroy(): void {
    //Nos desuscribimos del observable y como no hay nadie que lo escuche
    //va a dejar de emitir
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(100)
      .pipe(
        /*
          Emitiremos 10 veces
        */
        take(10),
        /*
          Mapeamos el valor
        */
        map( valor => ++valor ),
        /* 
          Filtramos los valores, si retornamos false, en el
          callback no se emitira nada y los otros
          operadores ya no se ejecutaran
        */
        filter( valor => valor % 2 == 0 ),
    );
  }

  retornarObsevable(): Observable<number>{
    //https://angular.io/guide/observables
    let i = 0;

    return new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        //Emitimos
        observer.next(i);
        if(i == 4){
          clearInterval(intervalo);
          //Finalizamos el observable
          observer.complete();
        }
        if(i == 2){
          //Lanzamos un error
          observer.error('i llego al valor de 2');
        }
      },1000);
    });
  }

  ngOnInit(): void {
  }

}
