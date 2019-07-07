import { DicsModel } from '../../shared/models/dic-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { stringify } from '@angular/compiler/src/util';

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

  update(dic) {
    const dicUpload = this.returnBodyUpdate(dic);
    return this.http.put(`${environment.apiUrl}DICs`, dicUpload, this.httpConf);
  }

  updateStatus(dic: DicsModel) {
    const dicUpload = this.returnBodyUpdateStatus(dic);
    return this.http.put(`${environment.apiUrl}DICs`, dicUpload, this.httpConf);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}DICs/id`);
  }

  create(dic) {
    console.log(dic);
    const dicUpload = this.returnBodyInsert(dic);
    return this.http.post(`${environment.apiUrl}DICs`, dicUpload, this.httpConf);
  }

  private returnBodyInsert(dic) {
    const date = new Date();
    const body = dic.idStatus === 3 ? {
      idUser: dic.idUser,
      idStatus: dic.idStatus,
      idPeriod: dic.idPeriod,
      description: dic.description,
      finishedDate: date.toString()
    } : {
      idUser: dic.idUser,
      idStatus: dic.idStatus,
      idPeriod: dic.idPeriod,
      description: dic.description,
    };
    return body;
  }

  private returnBodyUpdate(dic) {
    const date = new Date();
    const body = dic.idStatus === 3 ? {
      idUser: dic.idUser,
      idStatus: dic.idStatus,
      idPeriod: dic.idPeriod,
      description: dic.description,
      finishedDate: date.toString()
    } : {
      idUser: dic.idUser,
      idStatus: dic.idStatus,
      idPeriod: dic.idPeriod,
      description: dic.description,
    };
    return body;
  }

  private returnBodyUpdateStatus(dic: DicsModel) {
    const status = (dic.status.id + 1);
    const date = new Date();
    const body = status === 3 ? {
      id: dic.id,
      idUser: dic.user.id,
      idStatus: status,
      idPeriod: dic.period.id,
      description: dic.description,
      finishedDate: date.toString()
    } : {
      id: dic.id,
      idUser: dic.user.id,
      idStatus: status,
      idPeriod: dic.period.id,
      description: dic.description,
    };
    return body;
  }
}
