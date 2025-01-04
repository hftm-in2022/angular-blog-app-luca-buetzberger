// src\app\guards\auth.guard.ts

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user: User | null) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    // map((user) => !!user)
  );
};
