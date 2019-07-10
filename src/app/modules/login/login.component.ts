import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/authentication/auth.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  authSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private ngZone: NgZone,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.authSubscription = this.authService.login(this.formLogin.value).subscribe(
        data => {
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          this.ngZone.run(() => {
            this.router.navigate(['/kanban']);
            this.authService.showMenuEmitter.emit(true);
          });
        },
        error => {
          this.snackBar.open('Login ou senha incorretos!', 'ERRO', {
            duration: 2000
          });
        }
      );
    }
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
