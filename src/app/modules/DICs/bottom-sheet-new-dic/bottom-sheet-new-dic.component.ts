import { Component, OnInit, Inject } from '@angular/core';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DicsService } from '../dics.service';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { StatusService } from 'src/app/core/services/status.service';
import { UsersService } from '../../users/users.service';
import { Subscription } from 'rxjs';
import { Configuration } from 'src/app/shared/models/configuration';
import { Status } from 'src/app/shared/models/status';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-bottom-sheet-new-dic',
  templateUrl: './bottom-sheet-new-dic.component.html',
  styleUrls: ['./bottom-sheet-new-dic.component.css']
})
export class BottomSheetNewDicComponent implements OnInit {

  formDic: FormGroup;
  usersList: User[];
  allUsersList: User[];
  statusList: Status[];
  conf: Configuration;
  usersSubscription: Subscription;
  statusSubscription: Subscription;
  confSubscription: Subscription;
  modalRef: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private statusService: StatusService,
              private configurationService: ConfigurationService,
              private dicService: DicsService,
              public dialog: MatDialog,
              private bottomSheetRef: MatBottomSheetRef<BottomSheetNewDicComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.formDic = this.formBuilder.group({
      idUser: [null, [ Validators.required]],
      idStatus: [null, [ Validators.required]],
      description: [null, [ Validators.required]]
    });
  }

  ngOnInit() {
    this.usersSubscription = this.userService.get().subscribe(
      dados => { this.usersList = dados;
                 this.allUsersList = dados; },
      error => { console.log(error); }
    );
    this.statusSubscription = this.statusService.get().subscribe(
      status => { this.statusList = status; },
      error => { console.log(error); }
    );
    this.confSubscription = this.configurationService.get().subscribe(
      conf => { this.conf = conf; },
      error => { console.log(error); }
    );
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  filterUsers( event: KeyboardEvent) {
    const patern = `.*${(event.target as HTMLInputElement).value}`;
    this.usersList = this.allUsersList.filter( user => new RegExp(patern, 'gi').test(user.name));
  }

  onSubmit() {
    let valueSubmit = Object.assign({}, this.formDic.value);
    valueSubmit = Object.assign( valueSubmit, {
      idUser: this.allUsersList.filter(u => u.name = this.formDic.value.idUser)[0].id,
      finishedDate: this.formDic.value.idStatus === 3 ? new Date() : null
    });
    if (this.formDic.valid) {
      if (this.data.mode === 'new') {
        this.dicService.create(valueSubmit).subscribe(
          data => {
            this.modalRef = this.dialog.open(ModalComponent, {
              data: {
                message: 'Desafio individual do colaborador inserido com sucesso!',
                cancel: false
              }
            });
            this.formDic.reset();
            this.bottomSheetRef.dismiss();
          },
          error => {
            this.modalRef = this.dialog.open(ModalComponent, {
              data: {
                message: 'Erro! Plano não pode ser inserido.',
                cancel: false
              }
            });
          }
        );
      }
    } else {
      console.log('teste');
    }
  }

}
