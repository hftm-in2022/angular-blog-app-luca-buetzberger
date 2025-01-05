// src\app\shared\toolbar\toolbar.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../../features/login-page/login-page.component';
import { Observable } from 'rxjs';
import { Profile } from '../../core/models/profile.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginPageComponent],
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

  // goToProfile() {
  //   this.router.navigate(['/profile']);
  // }

  goToProfile() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/profile', user.uid]); // Navigate to the profile page with the user's ID
      }
    });
  }
}
