import { DicsModel } from './../../shared/models/dic-model';
import { Injectable, EventEmitter } from '@angular/core';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { DicsApiService } from './dics-api.service';
import { Configuration } from 'src/app/shared/models/configuration';

@Injectable({
  providedIn: 'root'
})
export class DicsService {
  listDics: DicsModel[];
  listAllDics: DicsModel[];
  periodList: number[] = [];
  conf: Configuration;

  listDicsEmitter = new EventEmitter<DicsModel[]>();
  configurationEmmiter = new EventEmitter<Configuration>();
  periodListEmitter = new EventEmitter<number[]>();

  constructor(private dicApiService: DicsApiService,
              private configurationService: ConfigurationService) { }

  getAllForList() {
    this.dicApiService.get().subscribe(list => {
      this.listAllDics = list;
      this.filterByPeriod(0);
    });
  }

  getConfiguration() {
    this.configurationService.get().subscribe(
      data => {
        this.conf = data;
        this.calculatePeriods(data.period.months);
        this.configurationEmmiter.emit(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  filterByPeriod(periodIndex: number) {
    this.listDics = this.listAllDics.filter(
      d => (new Date(d.startDate).getUTCMonth() + 1) >= this.periodList[periodIndex]
        && (new Date(d.startDate).getUTCMonth() + 1) < this.periodList[periodIndex + 1]);
    this.listDicsEmitter.emit(this.listDics);
  }

  filterByDefining() {
    return this.listDics.filter(d => d.status.id === 1);
  }

  filterByDefined() {
    return this.listDics.filter(d => d.status.id === 2);
  }

  filterByComplete() {
    return this.listDics.filter(d => d.status.id === 3);
  }

 // calculando e emitindo a period list
  calculatePeriods(conf: number) {
    let i = 1;
    while (i <= 12) {
      this.periodList.push(i);
      i = i + conf;
    }
    this.periodListEmitter.emit(this.periodList);
  }

}
