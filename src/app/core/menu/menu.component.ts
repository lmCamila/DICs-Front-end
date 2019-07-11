import { UsersApiService } from './../../modules/users/service/users-api.service';
import { LoginComponent } from './../../modules/login/login.component';
import { Router } from '@angular/router';

import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  showMenu = false;
  currentUser: any;
  private mobileQueryListener: () => void;

  userSubscriber: Subscription;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authService: AuthService,
              private router: Router,
              private userApiService: UsersApiService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.authService.showMenuEmitter.subscribe(
      show => {
        const id = JSON.parse(sessionStorage.getItem('currentUser'));
        if (id !== null) {
          this.userSubscriber = this.userApiService.getById(id.id).subscribe(
            data => {
              this.currentUser = data;
              this.showMenu = show;
            });
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logout() {
    this.showMenu = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setAvatar() {
    this.currentUser.user.avatar = '/assets/default-user-icon.jpg';
  }

}
