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
  listAllUsers: User[];

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
        this.listAllUsers = list;
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

  filter(value) {
    let searchFilter = value;
    searchFilter = searchFilter.replace(new RegExp('(ã|á|à|Ã|À|Á)', 'gi'), 'a');
    searchFilter = searchFilter.replace(new RegExp('(é|è|É|È)', 'gi'), 'e');
    searchFilter = searchFilter.replace(new RegExp('(í|ì|Í|Ì)', 'gi'), 'i');
    searchFilter = searchFilter.replace(new RegExp('(ó|ò|õ|Ò|Ó|Õ)', 'gi'), 'o');
    searchFilter = searchFilter.replace(new RegExp('(ú|ù|Ú|Ù)', 'gi'), 'u');
    searchFilter = searchFilter.replace(new RegExp('(ç|Ç)', 'gi'), 'c');
    const patern = `^${searchFilter}`;
    this.listUsers = this.listAllUsers.filter(u => new RegExp(patern, 'gi').test(u.name));
  }
}
