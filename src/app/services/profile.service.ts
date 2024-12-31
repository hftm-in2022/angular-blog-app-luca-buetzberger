// src\app\services\profile.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentData,
  docData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, switchMap, of, map } from 'rxjs';
import { Profile } from '../models/profile.model';
import { AuthService } from './auth.service';

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
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            // If user is logged in, fetch the profile
            return this.getProfileById(user.uid);
          } else {
            // If user is logged out, return null
            return of(null);
          }
        }),
      )
      .subscribe({
        next: (profile) => {
          this.profileSubject.next(profile); // Update the profile observable
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
          this.profileSubject.next(null); // Clear profile on error
        },
      });
  }

  // Fetch a user's profile by their UID
  getProfileById(userUID: string): Observable<Profile> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    return docData(profileDoc, { idField: 'documentID' }).pipe(
      map((profile: DocumentData) => this.applyFallbackValues(profile)),
    );
  }

  // Create a default profile for a new user
  async createDefaultProfile(userUID: string, email: string): Promise<void> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    const defaultProfile: Profile = {
      documentID: userUID,
      avatarURL: '', // Default avatar URL
      createdDate: new Date(),
      description: 'New user',
      displayName: 'Anonymous',
      email: email,
    };
    await setDoc(profileDoc, defaultProfile);
  }

  // Apply fallback values to a profile
  private applyFallbackValues(profile: DocumentData): Profile {
    return {
      documentID: profile['documentID'] || '', // Fallback to an empty string
      avatarURL: profile['avatarURL'] || 'default-avatar.png', // Fallback to a default avatar
      createdDate: profile['createdDate']?.toDate() || new Date(0), // Fallback to Unix epoch
      description: profile['description'] || 'No description provided', // Fallback to a default description
      displayName: profile['displayName']?.trim() || 'Anonymous', // Fallback to 'Anonymous'
      email: profile['email'] || 'No email provided', // Fallback to a default email
    };
  }
}
