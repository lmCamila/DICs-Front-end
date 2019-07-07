import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../../core/authentication/auth.service';
import { StructureService } from './../service/structure.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewProcessComponent } from '../new-process/new-process.component';
import { NewDepartmentComponent } from '../new-department/new-department.component';
import { Department } from 'src/app/shared/models/department';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit, OnDestroy {
  search = false;
  listStruct: any[] = [];
  listDepartment: Department[];
  step = 0;

  structureSubscription: Subscription;
  departmentSubscription: Subscription;
  showButtonsAdd = false;
  constructor(private authService: AuthService,
              private structureService: StructureService,
              public dialog: MatDialog) {
      this.authService.showMenuEmitter.emit(true);
      this.structureSubscription = this.structureService.listStructureEmitter.subscribe(data => {
        this.listStruct = data;
      });
      this.departmentSubscription = this.structureService.listDepartmentEmitter.subscribe(data => {
        this.listDepartment = data;
      });
   }

  ngOnInit() {
    this.structureService.getAll();
  }

  openSearch() {
    this.search = !this.search;
  }

  setStep(index: number) {
    this.step = index;
  }

  showButtons() {
    this.showButtonsAdd = !this.showButtonsAdd;
  }

  openNewProcess() {
    this.dialog.open( NewProcessComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'new'
      }
    });
  }

  openNewDepartment() {
    this.dialog.open( NewDepartmentComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'new',
      }
    });
  }

  openEditDepartment(item) {
    this.dialog.open( NewDepartmentComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'edit',
        department: item
      }
    });
  }

  openEditProcess(item) {
    this.dialog.open( NewProcessComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'edit',
        process: item
      }
    });
  }
  ngOnDestroy() {
    this.departmentSubscription.unsubscribe();
    this.structureSubscription.unsubscribe();
  }
}
