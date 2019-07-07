import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from 'src/app/shared/models/department';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StructureApiService } from 'src/app/core/services/structure-api.service';
import { Subscription } from 'rxjs';
import { StructureService } from '../service/structure.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-process',
  templateUrl: './new-process.component.html',
  styleUrls: ['./new-process.component.css']
})
export class NewProcessComponent implements OnInit, OnDestroy {

  formProcess: FormGroup;
  departmentList: Department[];
  title: string;

  departmentSubscription: Subscription;
  processSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private structureApiService: StructureApiService,
              private structureService: StructureService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<NewProcessComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formProcess = this.formBuilder.group({
      idDepartment: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.departmentSubscription = this.structureApiService.getDepartment().subscribe(
      data => this.departmentList = data
    );
    this.verifyMode();
  }

  verifyMode() {
    if (this.data.mode === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
      this.formProcess.setValue({
        name: this.data.process.name,
        idDepartment: this.data.process.department.id
      });
      // this.editDicSubscription = this.deparm.getById(this.data.id).subscribe(
      //   data => this.editDic = data
      // );
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formProcess.valid) {
      if (this.data.mode === 'new') {
        this.processSubscription = this.structureApiService.createProcess(this.formProcess.value).subscribe(
          success => {
            this.snackBar.open('Processo inserido com sucesso!', 'SUCESSO', {
              duration: 2000
            });
            this.structureService.getAll();
            this.formProcess.reset();
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Processo não pode ser inserido!', 'ERRO', {
              duration: 2000
            });
          }
        );
      } else if (this.data.mode === 'edit') {
        let valueSubmit = Object.assign({}, this.formProcess.value);
        valueSubmit = Object.assign( valueSubmit, {
          id: this.data.process.id
        });
        this.processSubscription = this.structureApiService.updateProcess(valueSubmit).subscribe(
          success => {
            this.snackBar.open('Processo alterado com sucesso!', 'SUCESSO', {
              duration: 2000
            });
            this.structureService.getAll();
            this.formProcess.reset();
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Processo não pode ser alterado!', 'ERRO', {
              duration: 2000
            });
          }
        );
      }
    }
  }
  ngOnDestroy() {
    this.departmentSubscription.unsubscribe();
    this.processSubscription.unsubscribe();
  }

}
