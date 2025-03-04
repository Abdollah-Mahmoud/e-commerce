import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  MaxValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { timeout } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  Success: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(
      null,

      [Validators.required, Validators.email]
    ),
    password: new FormControl(null, [Validators.required]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              localStorage?.setItem('token', res.token);

              this.authService.getUserData();

              this.router.navigate(['/home']);
            }, 500);

            this.Success = res.message;
          }

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
