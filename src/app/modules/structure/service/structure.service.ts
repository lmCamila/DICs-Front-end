import { StructureApiService } from '../../../core/services/structure-api.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Process } from 'src/app/shared/models/Process';
import { Department } from 'src/app/shared/models/department';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  listStructure: any[] = [];
  listDepartment: Department[] = [];
  listProcess: Process[];

  listStructureEmitter = new EventEmitter<any[]>();
  listDepartmentEmitter = new EventEmitter<Department[]>();
  constructor(private structureApi: StructureApiService) { }

  getAll() {
    this.structureApi.getProcess().subscribe(data => {
      this.listProcess = data;
      this.getDepartments(data);
    });
  }
  getDepartments(list: Process[]) {
    // list.forEach(element => {
    //   if (this.listDepartment.length === 0) {
    //     this.listDepartment.push(element.department.id);
    //   }
    //   const dep = this.listDepartment.filter(d => d === element.department.id);
    //   if (dep.length === 0) {
    //     this.listDepartment.push(element.department.id);
    //   }
    // });
    this.structureApi.getDepartment().subscribe(
      data => {
        this.listDepartment = data;
        this.filterList();
      }
    );
  }
  filterList() {
    if (this.listStructure.length !== 0) {
      this.listStructure = [];
    }
    this.listDepartment.forEach(element => {
      const list = this.listProcess.filter(p => p.department.id === element.id);
      this.listStructure.push(list);
      // if (list.length !== 0) {
      // }
    });
    this.listStructureEmitter.emit(this.listStructure);
    this.listDepartmentEmitter.emit(this.listDepartment);
  }
}

