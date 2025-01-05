// src\app\features\user-profile-page\profile-resolver.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../core/models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile | null> {
  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Profile | null> {
    const userUID = route.paramMap.get('id');
    if (userUID) {
      return this.profileService.getProfileById(userUID).pipe(
        catchError((error) => {
          console.error('Failed to fetch profile:', error);
          this.router.navigate(['/error']); // Redirect to an error page
          return of(null); // Return null if an error occurs
        }),
      );
    }
    return of(null);
  }
}
