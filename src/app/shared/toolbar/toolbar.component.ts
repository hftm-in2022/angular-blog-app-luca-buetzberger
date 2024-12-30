// src\app\shared\toolbar\toolbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../../features/login-modal/login-modal.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginModalComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  user: User | null = null; // Local variable to store the user object
  showLoginModal = false; // Controls the visibility of the login modal

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Subscribe to the user observable and update the local user variable
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  openLoginModal() {
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
