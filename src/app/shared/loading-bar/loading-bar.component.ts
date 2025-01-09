// src\app\shared\loading-bar\loading-bar.component.ts

import { Component } from '@angular/core';
import { LoadingBarService } from '../../core/services/loading-bar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent {
  constructor(public loadingBarService: LoadingBarService) {}
}

// Implementation using Redux Like Pattern
// export class LoadingBarComponent {
//   isLoading = false;

//   constructor(private loadingBarService: LoadingBarService) {
//     // Subscribe to the loading state from the service
//     this.loadingBarService.loading$.subscribe((loading) => {
//       this.isLoading = loading;
//     });
//   }
// }
