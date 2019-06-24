import { DicsModel } from './../../shared/models/dic-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DicsApiService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<DicsModel[]>(`${environment.apiUrl}DICs`);
  }

  getById(id: number) {
    return this.http.get<DicsModel>(`${environment.apiUrl}DICs/${id}`);
  }

  update(dic: DicsModel) {
    const dicUpload = this.returnBodyUpdate(dic);
    return this.http.put(`${environment.apiUrl}DICs`, dicUpload, this.httpConf);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}DICs/id`);
  }

  create(dic: DicsModel) {
    const dicUpload = this.returnBodyInsert(dic);
    return this.http.post(`${environment.apiUrl}DICs`, dicUpload, this.httpConf);
  }

  private returnBodyInsert(dic: DicsModel) {
    const body = {
      iduser: dic.user.id,
      idstatus: dic.status.id,
      idperiod: dic.period.id,
      description: dic.description
    };
    return body;
  }

  private returnBodyUpdate(dic: DicsModel) {
    const body = {
      id: dic.id,
      user: dic.user.id,
      status: dic.status.id,
      period: dic.period.id,
      description: dic.description,
      finishedDate: dic.finishedDate
    };
    return body;
  }
}
