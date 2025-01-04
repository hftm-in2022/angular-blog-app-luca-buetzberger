// src\app\services\profile.service.ts

import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentData,
  docData,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, switchMap, of, map, from } from 'rxjs';
import { Profile } from '../models/profile.model';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$: Observable<Profile | null> = this.profileSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
  ) {
    // Listen to authentication state changes
    this.listenToAuthChanges();
  }

  /**
   * Listen to authentication state changes and fetch or create profiles as needed.
   */
  private listenToAuthChanges(): void {
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.fetchProfile();
          } else {
            return of(null); // User is logged out
          }
        }),
      )
      .subscribe({
        next: (profile) => {
          this.profileSubject.next(profile); // Update the profile observable
        },
        error: (error) => {
          console.error('Error fetching or creating profile:', error);
          this.profileSubject.next(null); // Clear profile on error
        },
      });
  }

  // Fetch a user's profile by their UID (read-only).
  getProfileById(userUID: string): Observable<Profile | null> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    return docData(profileDoc, { idField: 'documentID' }).pipe(
      map((profile: DocumentData | undefined) => {
        return profile ? this.applyFallbackValues(profile) : null;
      }),
    );
  }

  // Create a new profile for a user.
  async createProfile(user: User): Promise<Profile> {
    const userUID = user.uid;
    const profileDoc = doc(this.firestore, 'profiles', userUID);

    const newProfile: Profile = {
      documentID: user.uid,
      avatarURL: '', // Default avatar URL
      createdDate: new Date(),
      description: 'New user',
      displayName: 'Anonymous',
      email: user.email || '',
      accountType: user.providerData[0].providerId || 'unknown', // Extract the first providerId from providerData
    };

    await setDoc(profileDoc, newProfile);
    return newProfile; // Return the created profile
  }

  // Fetch a profile, or create a new one if it doesn't exist.
  fetchProfile(): Observable<Profile> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error('No user is currently logged in.');
        }

        return this.getProfileById(user.uid).pipe(
          switchMap((profile) => {
            if (profile) {
              // Profile exists
              return of(profile);
            } else {
              // Profile does not exist, create a new one
              return from(this.createProfile(user));
            }
          }),
        );
      }),
    );
  }

  /**
   * Check if a profile exists for a given userUID.
   */
  async profileExists(userUID: string): Promise<boolean> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    const profileSnapshot = await getDoc(profileDoc);
    return profileSnapshot.exists();
  }

  /**
   * Apply fallback values to a profile to ensure all fields are populated.
   */
  private applyFallbackValues(profile: DocumentData): Profile {
    return {
      documentID: profile['documentID'] || '', // Fallback to an empty string
      avatarURL: profile['avatarURL'] || 'default-avatar.png', // Fallback to a default avatar
      createdDate: profile['createdDate']?.toDate() || new Date(0), // Fallback to Unix epoch
      description: profile['description'] || 'No description provided', // Fallback to a default description
      displayName: profile['displayName']?.trim() || 'Anonymous', // Fallback to 'Anonymous'
      email: profile['email'] || 'No email provided', // Fallback to a default email
      accountType: profile['accountType'] || 'anonymous', // Fallback to 'anonymous'
    };
  }
}
