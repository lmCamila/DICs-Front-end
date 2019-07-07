import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersRoutingModule } from './users.routing.module';
import { DemoMaterialModule } from 'src/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
  UsersComponent,
  UserCardComponent,
  NewUserComponent
],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  entryComponents: [
    NewUserComponent
  ]

})
export class UsersModule { }
