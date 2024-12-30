// src\app\features\login-modal\login-modal.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => this.closeModal());
  }

  // loginAnonymously() {
  //   this.authService.loginAnonymously().then(() => this.closeModal());
  // }

  closeModal() {
    this.close.emit();
  }
}
