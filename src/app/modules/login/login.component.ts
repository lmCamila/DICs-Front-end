import { AuthService } from '../../core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.authService.showMenuEmitter.emit(true);
          this.router.navigate(['/kanban']);
        },
        error => {
          console.log( error );
        }
      );
    }
  }
}
