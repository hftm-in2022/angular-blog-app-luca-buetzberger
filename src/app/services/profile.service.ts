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
    // Subscribe to the user observable from AuthService
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            // Fetch the profile if the user is logged in
            return this.getProfileById(user.uid);
          } else {
            // Return null if the user is logged out
            return of(null);
          }
        }),
      )
      .subscribe({
        next: (profile) => {
          this.profileSubject.next(profile); // Update the profile observable
        },
        error: (error) => {
          console.error('Failed to fetch user profile:', error);
          this.profileSubject.next(null);
        },
      });
  }

  // Fetch a user's profile by their UID
  getProfileById(userUID: string): Observable<Profile> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    return docData(profileDoc, { idField: 'documentID' }).pipe(
      map((profile: DocumentData) => {
        return {
          documentID: profile['documentID'] || '',
          avatarURL: profile['avatarURL'] || '',
          createdDate: profile['createdDate']?.toDate() || null,
          description: profile['description'] || '',
          displayName: profile['displayName'] || '',
          email: profile['email'] || '',
        } as Profile;
      }),
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
}
