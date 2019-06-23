import { Configuration } from './../../shared/models/configuration';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Configuration>(`${environment.apiUrl}Configurations/1`);
  }

  put(period: number) {
    const body = {
      id: 1,
      idPeriod: period
    };
    return this.http.put(`${environment.apiUrl}Configurations`, body, this.httpConf);
  }
}
