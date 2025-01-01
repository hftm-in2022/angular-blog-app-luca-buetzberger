// src\app\features\registration-page\registration-page.component.ts

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedValidators } from '../../shared/validators/shared-validators.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegisterModalComponent {
  @Output() close = new EventEmitter<void>();

  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, SharedValidators.password()]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  get emailFormControl() {
    return this.registerForm.get('email');
  }

  get passwordFormControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordFormControl() {
    return this.registerForm.get('confirmPassword');
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.registerForm.value;

    this.authService
      .registerWithEmail(email, password)
      .then(() => this.closeModal())
      .catch((error) => {
        console.error('Registration failed:', error);
        this.errorMessage = this.getErrorMessage(error);
      });
  }

  closeModal() {
    this.close.emit();
  }

  getErrorMessage(error: FirebaseError): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}
