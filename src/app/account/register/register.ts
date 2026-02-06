import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService, RegisterRequest } from '../account';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Customer']
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.registerForm.value as RegisterRequest;

    this.accountService.register(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'User created successfully!';
        this.registerForm.reset({ role: 'Customer' });

        setTimeout(() => this.router.navigate(['/account/login']), 1500);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}
