import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dic-kanban',
  templateUrl: './dic-kanban.component.html',
  styleUrls: ['./dic-kanban.component.css']
})
export class DicKanbanComponent implements OnInit {
  @Input() imgTeste;
  constructor() { }

  ngOnInit() {
  }

}
