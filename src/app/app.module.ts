import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { LOCALE_ID  } from '@angular/core';
import ptBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DemoMaterialModule } from 'src/material-module';
import { LoginComponent } from './modules/login/login.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { ModalComponent } from './core/modal/modal.component';
import { MenuComponent } from './core/menu/menu.component';
import { AppRoutingModule } from './app.routing.module';
import { registerLocaleData } from '@angular/common';
import { NewDicComponent } from './core/new-dic/new-dic.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ModalComponent,
    MenuComponent,
    NewDicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    DashboardComponent,
    NewDicComponent
  ],
  entryComponents: [
    AppComponent,
    NewDicComponent,
    ModalComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
