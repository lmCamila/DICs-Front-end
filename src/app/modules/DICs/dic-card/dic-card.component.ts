import { DicsModel } from './../../../shared/models/dic-model';
import { NewDicComponent } from './../../../core/new-dic/new-dic.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dic-card',
  templateUrl: './dic-card.component.html',
  styleUrls: ['./dic-card.component.css']
})
export class DICCardComponent implements OnInit {
  @Input() dic: DicsModel;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditDic(item) {
    this.dialog.open(NewDicComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'edit',
        dic: item
      }
    });
  }

}
