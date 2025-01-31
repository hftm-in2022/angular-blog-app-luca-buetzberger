// src\app\shared\toolbar\toolbar.component.ts

/**
 * ToolbarComponent
 * This component represents the navigation toolbar for the application.
 * It includes links to different pages, a button for creating blog posts,
 * and authentication-related actions (login/logout/profile).
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ProfileService } from '../../core/services/profile.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../../features/login-page/login-page.component';
import { Observable } from 'rxjs';
import { Profile } from '../../core/models/profile.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatMenuModule, LoginPageComponent, TranslateModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() menuToggle = new EventEmitter<void>(); // Event emitter for toggling the sidenav
  isNarrowViewport = false; // Tracks if the viewport is narrow
  user$: Observable<User | null>; // Observable for the authenticated user
  profile$: Observable<Profile | null>; // Observable for the user's profile
  showLoginModal = false; // Controls the visibility of the login modal
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Français', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de_ch', name: 'Schwiizerdütsch', flag: '🇨🇭' },
    { code: 'hexadecimal', name: 'Hexadecimal', flag: '🤖' },
    { code: 'morse', name: 'Morse Code', flag: '➗' },
    { code: 'en_pirate', name: 'Pirate English', flag: '🏴‍☠️' },
    { code: 'en_doge', name: 'Doge English', flag: '🐶' },
    { code: 'en_yoda', name: 'Yoda English', flag: '👽' },
  ];

  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.user$ = this.authService.user$; // Subscribe to the user observable
    this.profile$ = this.profileService.profile$; // Subscribe to the profile observable
    // this.updateViewport();
  }

  // Toggles the sidenav and emits the event
  toggleSidenav() {
    this.menuToggle.emit();
  }

  // Opens the login modal.
  openLoginModal() {
    console.log('ToolbarComponent: Opening login modal.');
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

  // Switches the language dynamically.
  switchLanguage(lang: string) {
    console.log(`ToolbarComponent: Switching language to ${lang}`);
    this.translate.use(lang);
  }
}
