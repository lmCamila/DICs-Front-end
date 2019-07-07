import { KanbanRoutingModule } from './kanban.routing.module';
import { CommonModule } from '@angular/common';
import { DicKanbanComponent } from './dic-kanban/dic-kanban.component';
import { DemoMaterialModule } from 'src/material-module';
import { KanbanComponent } from './kanban/kanban.component';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
      DicKanbanComponent,
      KanbanComponent
    ],
    imports: [
      CommonModule,
      DemoMaterialModule,
      KanbanRoutingModule
    ],
    exports:
    [
      DicKanbanComponent,
    ],
  })
  export class KanbanModule { }
