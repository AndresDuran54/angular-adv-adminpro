import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';

import { ChartsModule } from 'ng2-charts';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
