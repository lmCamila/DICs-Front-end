import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

 @Input() user: User;
  constructor() {
  }

  ngOnInit() {
  }

  setAvatar() {
    this.user.avatar = '/assets/default-user-icon.jpg';
  }
}
