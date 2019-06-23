import { Period } from './../../../shared/models/period';
import { Configuration } from './../../../shared/models/configuration';
import { UsersComponent } from './../../users/users/users.component';
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
  defining: any;
  defined: any;
  completed: any;
  listDics: DicsModel[];
  dicsPeriod: DicsModel[];
  periodList: number[] = [];

  dicsSubscription: Subscription;
  configSubscription: Subscription;
  loading = true;
  showFilter = false;
  conf: Configuration;

  constructor(private bottomSheet: MatBottomSheet,
              private dicService: DicsService,
              private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.configSubscription = this.configurationService.get().subscribe(
      data => {
        this.conf = data;
        this.calculatePeriods(data.period.months);
      },
      error => {
        console.log(error);
      }
    );
    this.dicsSubscription = this.dicService.get().subscribe(list => {
      this.listDics = list;
      this.filterByPeriod(0);
      this.loading = false;
    });
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

  calculatePeriods(conf: number) {
    let i = 1;
    while (i <= 12) {
      this.periodList.push(i);
      i = i + conf;
    }
  }

  filterByPeriod(periodIndex: number) {
    this.dicsPeriod = this.listDics.filter(
      d => (new Date(d.startDate).getUTCMonth() + 1) >= this.periodList[periodIndex]
        && (new Date(d.startDate).getUTCMonth() + 1) < this.periodList[periodIndex + 1]);
    this.defining = this.dicsPeriod.filter(d => d.status.id === 1);
    this.defined = this.dicsPeriod.filter(d => d.status.id === 2);
    this.completed = this.dicsPeriod.filter(d => d.status.id === 3);
    if (this.showFilter) {
      this.showFilterOptions();
    }
  }
  showFilterOptions() {
    this.showFilter = !this.showFilter;
  }

}
