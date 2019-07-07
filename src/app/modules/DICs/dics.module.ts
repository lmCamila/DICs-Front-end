import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/material-module';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DICCardComponent } from './dic-card/dic-card.component';
import { DICsComponent } from './dics/dics.component';
import { DicsRoutingModule } from './dics.routing.module';



@NgModule({
  declarations: [
    DICCardComponent,
    DICsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    DicsRoutingModule
  ],
  entryComponents:
  [
  ],
  exports:
  [
    DICCardComponent
  ],
  providers: [
  ]
})
export class DicsModule { }
