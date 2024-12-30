// src\app\shared\toolbar\toolbar.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../../features/login-modal/login-modal.component';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginModalComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  user$: Observable<User | null>; // Directly use the observable from AuthService
  profile$: Observable<Profile | null>; // Observable for the user's profile
  showLoginModal = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
  ) {
    this.user$ = this.authService.user$; // Subscribe to the user observable
    this.profile$ = this.profileService.profile$; // Subscribe to the profile observable
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
