// src\app\core\services\loading-bar.service.ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// Implementation using Signals
export class LoadingBarService {
  loading = signal(false);

  show(): void {
    this.loading.set(true);
  }

  hide(): void {
    this.loading.set(false);
  }
}

// Implementation using Redux Like Pattern
// export class LoadingBarService {
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   loading$ = this.loadingSubject.asObservable();

//   show(): void {
//     this.loadingSubject.next(true);
//     console.log('LoadingBarService: show() called');
//   }

//   hide(): void {
//     this.loadingSubject.next(false);
//     console.log('LoadingBarService: hide() called');
//   }
// }
