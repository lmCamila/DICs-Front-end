import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Department } from 'src/app/shared/models/department';
import { Process } from 'src/app/shared/models/Process';

@Injectable({
  providedIn: 'root'
})
export class StructureApiService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getDepartment() {
    return this.http.get<Department[]>(`${environment.apiUrl}Departments`);
  }

  getDepartmentById(id: number) {
    return this.http.get<Department>(`${environment.apiUrl}Departments/${id}`);
  }

  getProcess() {
    return this.http.get<Process[]>(`${environment.apiUrl}Processes`);
  }

  getProcessById(id: number) {
    return this.http.get<Process>(`${environment.apiUrl}Processes/${id}`);
  }

  createDepartmen(dep) {
    return this.http.post(`${environment.apiUrl}Departments`, dep, this.httpConf);
  }

  createProcess(process) {
    return this.http.post(`${environment.apiUrl}Processes`, process, this.httpConf);
  }

  updateDepartment(dep) {
    return this.http.put(`${environment.apiUrl}Departments`, dep, this.httpConf);
  }

  updateProcess(process) {
    return this.http.put(`${environment.apiUrl}Processes`, process, this.httpConf);
  }
}
