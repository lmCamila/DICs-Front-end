import { DicsService } from './../services/dics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Subscription } from 'rxjs';
import { Configuration } from 'src/app/shared/models/configuration';
import { Status } from 'src/app/shared/models/status';
import { User } from 'src/app/shared/models/user';
import { UsersApiService } from '../../modules/users/service/users-api.service';
import { DicsModel } from 'src/app/shared/models/dic-model';
import { DicsApiService } from '../services/dics-api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-bottom-sheet-new-dic',
  templateUrl: './new-dic.component.html',
  styleUrls: ['./new-dic.component.css']
})
export class NewDicComponent implements OnInit, OnDestroy {

  formDic: FormGroup;
  usersList: User[];
  allUsersList: User[];
  statusList: Status[];
  conf: Configuration;
  editDic: DicsModel;
  modalRef: any;
  title: string;

  editDicSubscription: Subscription;
  usersSubscription: Subscription;
  statusSubscription: Subscription;
  confSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersApiService,
              private statusService: StatusService,
              private configurationService: ConfigurationService,
              private dicApiService: DicsApiService,
              private dicService: DicsService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<NewDicComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formDic = this.formBuilder.group({
      idUser: [null, [Validators.required]],
      idStatus: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.usersSubscription = this.userService.get().subscribe(
      dados => {
        this.usersList = dados;
        this.allUsersList = dados;
      }
    );
    this.statusSubscription = this.statusService.get().subscribe(
      status => { this.statusList = status; }
    );
    this.confSubscription = this.configurationService.get().subscribe(
      conf => { this.conf = conf; }
    );
    this.verifyMode();
  }

  close() {
    this.dialogRef.close();
  }

  filterUsers(event: KeyboardEvent) {
    const patern = `.*${(event.target as HTMLInputElement).value}`;
    this.usersList = this.allUsersList.filter(user => new RegExp(patern, 'gi').test(user.name));
  }

  onSubmit() {
    if (this.formDic.valid) {
      if (this.data.mode === 'new') {
        let valueSubmit = Object.assign({}, this.formDic.value);
        valueSubmit = Object.assign(valueSubmit, {
          idUser: this.formDic.value.idUser.id,
          idPeriod: this.conf.period.id
        });
        this.dicApiService.create(valueSubmit).subscribe(
          success => {
            this.snackBar.open('Desafio interno do colaborador inserido com sucesso!', 'SUCESSO', {
              duration: 2000
            });
            this.dicService.getAllForList();
            this.formDic.reset();
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Erro! Desafio interno do colaborador não pode ser inserido!', 'ERRO', {
              duration: 2000
            });
          }
        );
      } else {
        let valueSubmit = Object.assign({}, this.formDic.value);
        valueSubmit = Object.assign(valueSubmit, {
          id: this.data.dic.id,
          idUser: this.formDic.value.idUser.id,
          idPeriod: this.data.dic.period.id
        });
        this.dicApiService.update(valueSubmit).subscribe(
          success => {
            console.log(success);
            this.snackBar.open('Desafio interno do colaborador alterado com sucesso!', 'SUCESSO', {
              duration: 2000
            });
            this.dicService.getAllForList();
            this.formDic.reset();
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Erro! Desafio interno do colaborador não pode ser alterado!', 'ERRO', {
              duration: 2000
            });
          }
        );
       }
     }
  }

  displayFn(user) {
    if (!user) {
      return '';
    }
    return user.name;
  }

  verifyMode() {
    if (this.data.mode === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
      this.fillForm(this.data.dic);
    }
  }

  fillForm(dic: DicsModel) {
    dic = Object.assign( dic, {
      idUser: dic.user,
      idStatus: dic.status.id
    });
    this.formDic.patchValue(dic);
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.confSubscription.unsubscribe();
    if (this.editDicSubscription) {
      this.editDicSubscription.unsubscribe();
    }
  }
}
