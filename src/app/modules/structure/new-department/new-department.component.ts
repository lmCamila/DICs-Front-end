import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { StructureService } from './../service/structure.service';
import { StructureApiService } from 'src/app/core/services/structure-api.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit, OnDestroy {

  formDepartment: FormGroup;
  title: string;
  structureApiSubscribe: Subscription;
  constructor(private formBuilder: FormBuilder,
              private structureApiService: StructureApiService,
              private structureService: StructureService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<NewDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formDepartment = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4)]]
    });
   }

  ngOnInit() {
    this.verifyMode();
  }

  verifyMode() {
    if (this.data.mode === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
      this.formDepartment.setValue({
        name: this.data.department.name
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formDepartment.valid) {
      if (this.data.mode === 'new') {
        this.structureApiSubscribe = this.structureApiService.createDepartmen(this.formDepartment.value).subscribe(
          success => {
            this.snackBar.open('Empreendimento inserido com sucesso!', 'SUCESSO', {
              duration: 2000
            });
            this.structureService.getAll();
            this.formDepartment.reset();
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Empreendimento não pode ser inserido!', 'ERRO', {
              duration: 2000
            });
          });
      } else if (this.data.mode === 'edit') {
        let valueSubmit = Object.assign({}, this.formDepartment.value);
        valueSubmit = Object.assign(valueSubmit, {
          id: this.data.department.id
        });
        this.structureApiSubscribe = this.structureApiService.updateDepartment(valueSubmit).subscribe(
          success => {
            this.snackBar.open('Empreendimento alterado com sucesso!', 'SUCESSO', {
              duration: 2000
            });
            this.structureService.getAll();
            this.formDepartment.reset();
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Empreendimento não pode ser alterado!', 'ERRO', {
              duration: 2000
            });
          });
      }
    }
  }
  ngOnDestroy() {
    this.structureApiSubscribe.unsubscribe();
  }
}
