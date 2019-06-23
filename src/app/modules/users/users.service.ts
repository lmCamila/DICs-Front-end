import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { UserDics } from 'src/app/shared/models/user-dics';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<User>(`${environment.apiUrl}/Users`);
  }

  getDics(id: number) {
    return this.http.get<UserDics>(`${environment.apiUrl}/Users/dics/${id}`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/Users/${id}`);
  }

  update(user: User, pass) {
    const userUpload = this.returnBodyUpdate(user, pass);
    return this.http.put(`${environment.apiUrl}/Users`, userUpload, this.httpConf);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/Users/${id}`);
  }

  create(user: User, pass: string) {
    const userUpload = this.returnBodyToInsert(user, pass);
    return this.http.post(`${environment.apiUrl}/Users`, userUpload, this.httpConf);
  }

  private returnBodyUpdate(user: User, pass) {
    const body = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      department: user.department.id,
      process: user.process.id,
      password: pass,
      isLeaderDepartment: user.isLeaderDepartment,
      isLeaderProcess: user.isLeaderProcess,
      isAdmin: user.isAdmin,
      removed: user.removed
    };
    return body;
  }

  private returnBodyToInsert(user: User, pass: string) {
    const body = {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      department: user.department.id,
      process: user.process.id,
      password: pass,
      isLeaderDepartment: user.isLeaderDepartment,
      isLeaderProcess: user.isLeaderProcess,
      isAdmin: user.isAdmin,
      removed: user.removed
    };
    return body;
  }
}
