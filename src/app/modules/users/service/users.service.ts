import { Injectable, EventEmitter } from '@angular/core';

import { Department } from 'src/app/shared/models/department';
import { User } from 'src/app/shared/models/user';
import { UsersApiService } from './users-api.service';
import { DicsModel } from 'src/app/shared/models/dic-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  listAllUsers: User[];
  listUser: User[];
  departmentList: any[] = [];
  filteredList: any[] = [];

  listUsersEmitter = new EventEmitter<User[]>();
  listFilteredEmmiter = new EventEmitter<any>();

  constructor(private usersApiService: UsersApiService) { }

 getAllForList() {
    this.usersApiService.get().subscribe(
      data => {
        this.listAllUsers = data;
        this.listFilteredEmmiter.emit(this.listAllUsers);
      });
  }

  // getDepartments(list: User[]) {
  //   list.forEach(element => {
  //     if (this.departmentList.length === 0) {
  //       this.departmentList.push(element.department.id);
  //     }
  //     const dep = this.departmentList.filter(d => d === element.department.id);
  //     if (dep.length === 0) {
  //       this.departmentList.push(element.department.id);
  //     }
  //   });
  // }

  // filterListByDepartments() {
  //   if (this.filteredList.length !== 0) {
  //     this.filteredList = [];
  //   }
  //   this.departmentList.forEach(element => {
  //     const list = this.listAllUsers.filter(u => u.department.id === element);
  //     if (list.length !== 0) {
  //       this.filteredList.push(list);
  //     }
  //   });
  //   this.listFilteredEmmiter.emit(this.filteredList);
  // }
}

