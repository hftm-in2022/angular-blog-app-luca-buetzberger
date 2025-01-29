// src\app\app.component.ts
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { LoadingBarService } from './core/services/loading-bar.service';
import { LoadingBarComponent } from './shared/loading-bar/loading-bar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, LoadingBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loadingBarService: LoadingBarService,
    private translate: TranslateService,
  ) {
    // Initialize the default language
    this.translate.setDefaultLang('en'); // Default language
    this.translate.use('en'); // Language to use
  }

  ngOnInit(): void {
    // Listen to router events to control the loading bar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('AppComponent: NavigationStart detected');
        this.loadingBarService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        console.log('AppComponent: NavigationEnd/Cancel/Error detected');
        this.loadingBarService.hide();
      }
    });
  }

  // Method to switch languages
  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
