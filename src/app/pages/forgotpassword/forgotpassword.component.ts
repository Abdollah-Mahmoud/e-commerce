import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotPassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotPassword.component.html',
  styleUrl: './forgotPassword.component.scss',
})
export class forgotPasswordComponent {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);

  step: number = 1;
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6]$/),
    ]),
  });
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  verifyCodeSubmit(): void {
    this.AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPasswordSubmit(): void {
    this.AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.AuthService.getUserData();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
