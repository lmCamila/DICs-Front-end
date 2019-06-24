import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicKanbanComponent } from './dic-kanban/dic-kanban.component';
import { DICCardComponent } from './dic-card/dic-card.component';
import { DemoMaterialModule } from 'src/material-module';
import { KanbanComponent } from './kanban/kanban.component';
import { BottomSheetNewDicComponent } from './bottom-sheet-new-dic/bottom-sheet-new-dic.component';
import { DICsComponent } from './dics/dics.component';
import { DicsRoutingModule } from './dics.routing.module';
import { GeneralComponent } from './general/general.component';

@NgModule({
  declarations: [
    DICCardComponent,
    DicKanbanComponent,
    BottomSheetNewDicComponent,
    KanbanComponent,
    DICsComponent,
    GeneralComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    DicsRoutingModule
  ],
  entryComponents:
  [
    BottomSheetNewDicComponent
  ],
  exports:
  [
    DicKanbanComponent,
    DICCardComponent,
    BottomSheetNewDicComponent,
    KanbanComponent
  ]
})
export class DicsModule { }
