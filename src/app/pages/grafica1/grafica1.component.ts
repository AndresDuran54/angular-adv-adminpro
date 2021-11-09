import { Component } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  constructor(){
  }

  public labels1: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public data1: MultiDataSet = [
    [320, 410, 150]
  ];

  public labels2: Label[] = ['Pan', 'Refresco', 'Tacos'];

  public data2: MultiDataSet = [
    [350, 100, 100]
  ];

  public labels3: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public data3: MultiDataSet = [
    [350, 250, 200]
  ];

  public labels4: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public data4: MultiDataSet = [
    [150, 250, 150]
  ];
}