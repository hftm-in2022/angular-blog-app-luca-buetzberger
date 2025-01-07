// src\app\core\guards\authentication.guard.ts

/**
 * This guard checks if the user is logged in before allowing access to a route.
 *
 * - If the user is logged in, access is granted..
 * - If the user is not logged in, they are redirected to the default route.
 * - If an error occurs, they are redirected to the error page.
 *
 * Firebase authentication is used to check the user's login state.
 */

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = async () => {
  const authService = inject(AuthService); // Check the user's login state
  const router = inject(Router); // Handle navigation

  try {
    const user = await authService.waitForAuthState(); // Resolve authentication state
    if (user) {
      console.log('Authorization Guard: User is logged in. Access granted.');
      return true; // Grant access
    } else {
      console.warn('Authorization Guard: User is not logged in. Redirecting to the default route.');
      router.navigate(['/']);
      return false; // Deny access
    }
  } catch (error) {
    console.error('Authorization Guard: An error occurred while checking authentication state:', error);
    router.navigate(['/error']);
    return false; // Deny access
  }
};
