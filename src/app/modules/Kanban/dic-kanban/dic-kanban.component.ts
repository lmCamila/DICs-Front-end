import { DicsModel } from '../../../shared/models/dic-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dic-kanban',
  templateUrl: './dic-kanban.component.html',
  styleUrls: ['./dic-kanban.component.css']
})
export class DicKanbanComponent implements OnInit {
  @Input() dic: DicsModel;
  constructor() { }

  ngOnInit() {
  }

  setAvatar() {
    this.dic.user.avatar = '/assets/default-user-icon.jpg';
  }
}
