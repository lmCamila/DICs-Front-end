import { UsersService } from '../service/users.service';
import { AuthService } from './../../../core/authentication/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../new-user/new-user.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {


  listUsers: User[];

  loading = true;
  search = false;
  usersSubscription: Subscription;
  constructor(private authService: AuthService,
              private userService: UsersService,
              private dialog: MatDialog) {

    this.authService.showMenuEmitter.emit(true);
    this.usersSubscription = this.userService.listFilteredEmmiter.subscribe(
      list => {
        this.listUsers = list;
        this.loading = false;
      }
    );
    this.userService.getAllForList();
  }

  ngOnInit() {
  }
  openNewUser() {
    this.dialog.open(NewUserComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        mode: 'new'
      }
    });
  }
  openSearch() {
    this.search = !this.search;
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
