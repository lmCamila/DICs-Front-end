import { Component, OnInit, Input } from '@angular/core';
import { DicsModel } from 'src/app/shared/models/dic-model';

@Component({
  selector: 'app-dic-card',
  templateUrl: './dic-card.component.html',
  styleUrls: ['./dic-card.component.css']
})
export class DICCardComponent implements OnInit {
  @Input() dic: DicsModel;
  constructor() { }

  ngOnInit() {
  }

}
