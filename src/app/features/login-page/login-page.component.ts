// src\app\features\login-page\login-page.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  @Output() close = new EventEmitter<void>();

  authForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required]], // Removed Validators.email
      password: ['', [Validators.required]],
    });
  }

  get emailFormControl() {
    return this.authForm.get('email');
  }

  get passwordFormControl() {
    return this.authForm.get('password');
  }

  loginAnonymously() {
    this.authService.loginAnonymously().then(() => this.closeModal());
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => this.closeModal());
  }

  loginWithEmail() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.authForm.value;

    this.authService
      .loginWithEmail(email, password)
      .then(() => this.closeModal())
      .catch((error) => {
        console.error('Login failed:', error);
        this.errorMessage = this.getErrorMessage(error);
      });
  }

  navigateToRegister() {
    this.router.navigate(['/registration']); // Navigate to the registration page
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  getErrorMessage(error: FirebaseError): string {
    console.error('Firebase Error:', error); // Log the full error for debugging

    switch (error.code) {
      case 'auth/user-not-found':
        return 'Invalid credentials or user does not exist. Please try again.';
      case 'auth/invalid-password':
        return 'Invalid credentials or user does not exist. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid credentials or user does not exist. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many login attempts. Please try again later.';
      case 'auth/internal-error':
        return 'An internal server error occurred. Please try again later.';
      case 'auth/invalid-credential':
        return 'Invalid credentials or user does not exist. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}
