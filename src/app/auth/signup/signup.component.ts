import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  host: {
    class: 'signup-page'
  }
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: String = '';
  hidePassword: boolean = true;


  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['', [Validators.required, Validators.pattern(/^(male|female|other)$/)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isSubmitting = true;
    this.authService.signup(this.signupForm?.value).subscribe({
      next: (res: any) => {
        if(res?.status) {
          this.gotoLogin();
        }
        else {
          this.errorMessage = res?.message || 'Signup failed';
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Signup failed';
        this.isSubmitting = false;
      }
    }) 
  }

  gotoLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
