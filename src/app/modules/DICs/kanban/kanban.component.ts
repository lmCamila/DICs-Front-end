import { AuthService } from './../../../core/authentication/auth.service';
import { Configuration } from './../../../shared/models/configuration';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

import { BottomSheetNewDicComponent } from '../bottom-sheet-new-dic/bottom-sheet-new-dic.component';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { DicsModel } from 'src/app/shared/models/dic-model';
import { DicsService } from './../dics.service';
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

  dicsSubscription: Subscription;
  configSubscription: Subscription;
  periodListSubscription: Subscription;

  conf: Configuration;

  loading = true;
  showFilter = false;
  constructor(private bottomSheet: MatBottomSheet,
              private dicService: DicsService,
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
    }
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetNewDicComponent);
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
    this.dicsSubscription.unsubscribe();
  }

  showFilterOptions() {
    this.showFilter = !this.showFilter;
  }

  filterPeriod(period: number) {
    this.dicService.filterByPeriod(period);
  }

}
