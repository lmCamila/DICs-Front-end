import { Component, OnInit, OnDestroy } from '@angular/core';
import { DicsModel } from 'src/app/shared/models/dic-model';
import { Subscription } from 'rxjs';
import { Configuration } from 'src/app/shared/models/configuration';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DicsService } from '../dics.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { BottomSheetNewDicComponent } from '../bottom-sheet-new-dic/bottom-sheet-new-dic.component';

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
