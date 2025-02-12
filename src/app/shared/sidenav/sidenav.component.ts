import { Component, HostBinding, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, MatSidenavModule, RouterModule, TranslateModule, MatIcon, MatListModule, MatButtonModule, MatTooltipModule, MatMenuModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  user$: Observable<User | null>; // Observable for the authenticated user
  profile$: Observable<Profile | null>;
  showLoginModal = false;
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

  @HostBinding('class.open') isOpen = false;

  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.user$ = this.authService.user$; // Subscribe to the user observable
    this.profile$ = this.profileService.profile$; // Subscribe to the profile observable
  }

  toggle() {
    this.isOpen = !this.isOpen; // Toggle the sidenav state
  }

  close() {
    this.isOpen = false; // Close the sidenav
  }

  // Automatically closes the sidenav when the viewport becomes wide
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 768) {
      this.close(); // Close the sidenav if the viewport is wide
    }
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
