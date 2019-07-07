import { DemoMaterialModule } from 'src/material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure.routing.module';
import { StructureComponent } from './structure/structure.component';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { NewProcessComponent } from './new-process/new-process.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StructureComponent,
    NewDepartmentComponent,
    NewProcessComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  entryComponents: [
    StructureComponent,
    NewDepartmentComponent,
    NewProcessComponent
  ]
})
export class StructureModule { }
