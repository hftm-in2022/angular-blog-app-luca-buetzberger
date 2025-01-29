// src\app\core\guards\authorization-user.guard.ts

/**
 * This guard checks if the user's profile has the required role (`user`) to access a route.
 *
 * - If the profile has the `user` role, access is granted.
 * - If the profile does not have the `user` role, access is denied, and the user is redirected to the default route.
 * - If no profile is available or an error occurs, access is denied, and the user is redirected to the error page.
 *
 * The user's profile is fetched from the `ProfileService` and checked for the required role.
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

export const authorizationUserGuard: CanActivateFn = async () => {
  const profileService = inject(ProfileService); // Access the user's profile
  const router = inject(Router); // Handle navigation

  try {
    console.log('Authorization User Guard: Waiting for profile state...');
    const profile = await profileService.waitForProfileState(); // Resolve the user's profile
    console.log('Authorization User Guard: Profile resolved:', profile);
    if (profile?.roles.includes('user')) {
      console.log('Authorization User Guard: User has the required role. Access granted.');
      return true; // Allow access
    } else {
      console.warn('Authorization User Guard: User does not have the required role. Redirecting to default route.');
      router.navigate(['/']); // Redirect to default route
      return false; // Deny access
    }
  } catch (error) {
    console.error('Authorization User Guard: An error occurred while checking the user authorization:', error);
    router.navigate(['/error']);
    return false; // Deny access
  }
};

// bitte alle logs löschen...
