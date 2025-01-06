// src\app\core\guards\authentication.guard.ts

/**
 * This file defines an authentication guard for Angular routes.
 * The guard checks if the user is logged in before granting access to a route.
 *
 * - If the user is logged in, they are allowed to access the route.
 * - If the user is not logged in, they are redirected to the default route.
 * - If an error occurs while checking the authentication state, the user is redirected to the error page.
 *
 * This guard uses Firebase authentication to determine the user's login state.
 */

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = async () => {
  // Inject the AuthService to check if the user is logged in
  const authService = inject(AuthService);
  // Inject the Router to handle navigation (redirects)
  const router = inject(Router);

  try {
    // Wait for Firebase to resolve the authentication state
    const user = await authService.waitForAuthState();
    if (user) {
      // If the user is logged in, allow access to the route
      console.log('Auth Guard: User is logged in. Access granted.');
      return true; // Grant access to the route
    } else {
      // If the user is not logged in, redirect to the default route (e.g., home page)
      console.warn('Auth Guard: User is not logged in. Redirecting to the default route.');
      router.navigate(['/']); // Redirect to the default route
      return false; // Block access to the route
    }
  } catch (error) {
    // If an error occurs, log it and redirect to the error page
    console.error('Auth Guard: An error occurred while checking authentication state:', error);
    router.navigate(['/error']); // Redirect to the error page
    return false; // Block access to the route
  }
};
