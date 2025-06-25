import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'login-page'
  }
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: String = '';
  hidePassword: boolean = true;


  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.authService.login(this.loginForm?.value).subscribe({
      next: (res: any) => {
        this.authService.setUser(res?.userId);
        this.router.navigate(['../../home/tasks'], { relativeTo: this.route });
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Login failed';
        this.isSubmitting = false;
      }
    }) 
  }

  gotoSignup() {
    this.router.navigate(['../signup'], { relativeTo: this.route });
  }
}
