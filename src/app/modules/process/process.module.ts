import { ProcessRoutingModule } from './process.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process/process.component';

@NgModule({
  declarations: [
    ProcessComponent
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule
  ]
})
export class ProcessModule { }
