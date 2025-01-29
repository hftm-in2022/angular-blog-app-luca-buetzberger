// src\app\shared\toolbar\toolbar.component.ts

/**
 * ToolbarComponent
 * This component represents the navigation toolbar for the application.
 * It includes links to different pages, a button for creating blog posts,
 * and authentication-related actions (login/logout/profile).
 */

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ProfileService } from '../../core/services/profile.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../../features/login-page/login-page.component';
import { Observable } from 'rxjs';
import { Profile } from '../../core/models/profile.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTooltipModule, LoginPageComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  user$: Observable<User | null>; // Observable for the authenticated user
  profile$: Observable<Profile | null>; // Observable for the user's profile
  showLoginModal = false; // Controls the visibility of the login modal

  constructor(
    private authService: AuthenticationService, // keine dependencies in DumbComponents
    private profileService: ProfileService,
    private router: Router,
  ) {
    this.user$ = this.authService.user$; // Subscribe to the user observable
    this.profile$ = this.profileService.profile$; // Subscribe to the profile observable
  }

  // Opens the login modal.
  openLoginModal() {
    console.log('ToolbarComponent: Opening login modal.'); // keine logs in produktivem code
    this.showLoginModal = true;
  }

  // Closes the login modal.
  closeLoginModal() {
    console.log('ToolbarComponent: Closing login modal.');
    this.showLoginModal = false;
  }

  // Logs out the current user.
  logout() {
    console.log('ToolbarComponent: Logging out the user.');
    this.authService.logout();
  }

  // Navigates to the profile page of the logged-in user.
  goToProfile() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        console.log(`ToolbarComponent: Navigating to profile page for user ID: ${user.uid}`);
        this.router.navigate(['/profile', user.uid]);
      } else {
        console.warn('ToolbarComponent: No user is logged in. Cannot navigate to profile.');
      }
    });
  }
}
