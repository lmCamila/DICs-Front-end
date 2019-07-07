import { DicsApiService } from './../../../core/services/dics-api.service';
import { ModalService } from './../../../core/services/modal.service';
import { ModalComponent } from './../../../core/modal/modal.component';
import { AuthService } from './../../../core/authentication/auth.service';
import { Configuration } from './../../../shared/models/configuration';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { DicsModel } from 'src/app/shared/models/dic-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DicsService } from 'src/app/core/services/dics.service';
import { NewDicComponent } from 'src/app/core/new-dic/new-dic.component';
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit, OnDestroy {
  defining: DicsModel[];
  defined: DicsModel[];
  completed: DicsModel[];
  listDics: DicsModel[];
  dicsPeriod: DicsModel[];
  periodList: number[];
  dicDropped: DicsModel;
  dialogModal: MatDialogRef<ModalComponent>;
  conf: Configuration;
  loading = true;
  showFilter = false;

  dicsSubscription: Subscription;
  configSubscription: Subscription;
  periodListSubscription: Subscription;
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog,
              private snack: MatSnackBar,
              private dicService: DicsService,
              private dicsApiService: DicsApiService,
              private modalService: ModalService,
              private authService: AuthService) {
    this.authService.showMenuEmitter.emit(true);
    this.configSubscription = this.dicService.configurationEmmiter.subscribe(
      data => this.conf = data
    );
    this.periodListSubscription = this.dicService.periodListEmitter.subscribe(
      data => this.periodList = data
    );
    this.dicsSubscription = this.dicService.listDicsEmitter.subscribe(
      data => {
        this.listDics = data;
        this.defining = this.dicService.filterByDefining();
        this.defined = this.dicService.filterByDefined();
        this.completed = this.dicService.filterByComplete();
        this.loading = false;
      }
    );
  }

  ngOnInit() {
    this.dicService.getConfiguration();
    this.dicService.getAllForList();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.changeStatus();
    }
  }

  openNewDic(): void {
    this.dialog.open(NewDicComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'new'
      }
    });
  }

  showFilterOptions() {
    this.showFilter = !this.showFilter;
  }

  filterPeriod(period: number) {
    this.dicService.filterByPeriod(period);
    this.showFilterOptions();
  }

  setDicDropped(dic: DicsModel) {
    this.dicDropped = dic;
  }

  changeStatus() {
    this.dialogModal = this.dialog.open(ModalComponent, {
      data: { message: `Deseja realmente mudar o dic de status ?`,
              cancel: true}
    });
    this.dialogSubscription = this.modalService.eventMessageDialog.subscribe(
      confirm => {
        this.dicsApiService.updateStatus(this.dicDropped).subscribe(
          success => {
            this.snack.open('dic transferido com sucesso!', null, {
            duration: 2000,
          });
        });
      });
  }
  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<string>) {
    if (item.data === 'defined') {
      return true;
    } else {
      return false;
    }
  }
  otherPredicate(item: CdkDrag<string>) {
    if (item.data === 'defining') {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
    this.dicsSubscription.unsubscribe();
    this.periodListSubscription.unsubscribe();
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }


}
