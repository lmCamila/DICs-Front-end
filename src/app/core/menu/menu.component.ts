import { Router } from '@angular/router';

import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../authentication/auth.service';

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

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authService: AuthService,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.authService.showMenuEmitter.subscribe(
      show => this.showMenu = show
    );
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logout() {
    this.authService.logout();
    this.authService.showMenuEmitter.emit(false);
    this.router.navigate(['/login']);
  }

  setAvatar() {
    this.currentUser.user.avatar = '/assets/default-user-icon.jpg';
  }

}
