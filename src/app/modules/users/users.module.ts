import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
  UsersComponent],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
