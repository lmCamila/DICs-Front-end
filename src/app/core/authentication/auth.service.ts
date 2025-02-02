import { Login } from './../../shared/models/login';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  showMenuEmitter = new EventEmitter<boolean>();
  userEmitter = new EventEmitter<any>();
  constructor(private http: HttpClient) { }
  login(body) {
    // const body = {
    //   email: emailUser,
    //   password: pass
    // };
    return this.http.post<Login>(`${environment.apiUrl}users/authenticate`, body, this.httpConf);
  }
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }
}
