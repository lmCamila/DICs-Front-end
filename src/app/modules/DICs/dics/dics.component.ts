import { Component, OnInit, OnDestroy } from '@angular/core';
import { DicsModel } from 'src/app/shared/models/dic-model';
import { Subscription } from 'rxjs';
import { Configuration } from 'src/app/shared/models/configuration';
import { DicsService } from '../../../core/services/dics.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NewDicComponent } from 'src/app/core/new-dic/new-dic.component';

@Component({
  selector: 'app-dics',
  templateUrl: './dics.component.html',
  styleUrls: ['./dics.component.css']
})
export class DICsComponent implements OnInit, OnDestroy {
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

  constructor(private dialog: MatDialog,
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
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
    this.dicsSubscription.unsubscribe();
    this.periodListSubscription.unsubscribe();
  }

}
