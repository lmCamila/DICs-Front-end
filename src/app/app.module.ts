import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DemoMaterialModule } from 'src/material-module';
import { DICCardComponent } from './modules/DICs/dic-card/dic-card.component';
import { DicKanbanComponent } from './modules/DICs/dic-kanban/dic-kanban.component';
import { KanbanComponent } from './modules/kanban/kanban.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DICCardComponent,
    DicKanbanComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
