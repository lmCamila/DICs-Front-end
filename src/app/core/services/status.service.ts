import { Status } from './../../shared/models/status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<Status[]>(`${environment.apiUrl}Status`);
  }
}
