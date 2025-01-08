// src\app\core\services\profile.service.ts

/**
 * ProfileService
 * This service manages user profiles in the application. It interacts with Firebase Firestore
 * to fetch, create, and update user profiles. It also listens to authentication state changes
 * to ensure the profile state is always up-to-date.
 */

import { Injectable } from '@angular/core';
import { Firestore, DocumentData, docData, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, switchMap, of, map, from } from 'rxjs';
import { Profile } from '../models/profile.model';
import { AuthenticationService } from './authentication.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<Profile | null>(null); // Observable to track the current user's profile
  profile$: Observable<Profile | null> = this.profileSubject.asObservable(); // Exposes the profile state as an observable
  private profileStateResolved = false; // Tracks whether the profile state has been resolved

  constructor(
    private firestore: Firestore,
    private authenticationService: AuthenticationService,
  ) {
    // Listen to authentication state changes and update the profile state
    this.listenToAuthChanges();
  }

  // Listens to authentication state changes and fetches or creates profiles as needed.
  private listenToAuthChanges(): void {
    this.authenticationService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            console.log('ProfileService: User logged in. Fetching profile...');
            return this.fetchCurrentUserProfile();
          } else {
            console.log('ProfileService: User logged out. Clearing profile state.');
            return of(null); // Clear the profile state when the user logs out
          }
        }),
      )
      .subscribe({
        next: (profile) => {
          this.profileSubject.next(profile); // Update the profile observable
          this.profileStateResolved = true; // Mark the profile state as resolved
          console.log('ProfileService: Profile state updated:', profile);
        },
        error: (error) => {
          console.error('ProfileService: Error fetching or creating profile:', error);
          this.profileSubject.next(null); // Clear the profile state on error
          this.profileStateResolved = true; // Mark the profile state as resolved even on error
        },
      });
  }

  // Waits for the profile state to resolve.
  // This ensures the app knows whether a profile exists or not before proceeding.
  // returns A promise that resolves with the current profile or null.
  async waitForProfileState(): Promise<Profile | null> {
    if (this.profileStateResolved) {
      console.log('ProfileService: Profile state already resolved.');
      return this.profileSubject.value; // Return the current profile if already resolved
    }
    console.log('ProfileService: Waiting for profile state to resolve...');
    return new Promise((resolve) => {
      const subscription = this.profile$.subscribe((profile) => {
        if (this.profileStateResolved) {
          console.log('ProfileService: Profile state resolved:', profile);
          resolve(profile);
          subscription.unsubscribe(); // Clean up subscription
        }
      });
    });
  }

  // Fetches a user's profile by their UID.
  getProfileById(userUID: string): Observable<Profile | null> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    return docData(profileDoc, { idField: 'documentID' }).pipe(
      map((profile: DocumentData | undefined) => {
        return profile ? this.validateIncomingProfile(profile) : null;
      }),
    );
  }

  // Creates a new profile for a user.
  async createProfile(user: User): Promise<Profile> {
    const userUID = user.uid;
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    const accountType = user.providerData.length > 0 ? user.providerData[0].providerId : 'anonymous';
    const newProfile: Partial<Profile> = {
      documentID: user.uid,
      avatarURL: '',
      createdDate: new Date(),
      description: 'New user',
      displayName: 'Anonymous',
      email: user.email || '',
      accountType,
      roles: ['user'],
    };
    try {
      const validatedProfile = this.validateOutgoingProfile(newProfile);
      await setDoc(profileDoc, validatedProfile); // Save the profile to Firestore
      console.log('ProfileService: Profile created successfully:', validatedProfile);
      return validatedProfile;
    } catch (error) {
      console.error('ProfileService: Error creating profile:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  // Fetches a profile, or creates a new one if it doesn't exist.
  // Returns An observable of the user's profile
  fetchCurrentUserProfile(): Observable<Profile> {
    return this.authenticationService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error('ProfileService: No user is currently logged in.');
        }

        return this.getProfileById(user.uid).pipe(
          switchMap((profile) => {
            if (profile) {
              console.log('ProfileService: Existing profile found:', profile);
              return of(profile); // Return the existing profile
            } else {
              console.log('ProfileService: No profile found. Creating a new one...');
              return from(this.createProfile(user)); // Create a new profile
            }
          }),
        );
      }),
    );
  }

  // Checks if a profile exists for a given user UID.
  async profileExists(userUID: string): Promise<boolean> {
    const profileDoc = doc(this.firestore, 'profiles', userUID);
    try {
      const profileSnapshot = await getDoc(profileDoc);
      return profileSnapshot.exists();
    } catch (error) {
      console.error('ProfileService: Error checking if profile exists:', error);
      throw error;
    }
  }

  //  Validates and sanitizes a profile received from the backend.
  private validateIncomingProfile(data: DocumentData): Profile {
    if (!data) {
      throw new Error('Invalid profile data: Data is null or undefined.');
    }
    return {
      documentID: data['documentID'] || '', // Ensure the ID is a string
      avatarURL: data['avatarURL'] || '', // Default to an empty string
      createdDate: data['createdDate']?.toDate() || new Date(0), // Ensure valid date
      description: data['description'] || 'No description provided', // Default description
      displayName: data['displayName']?.trim() || 'Anonymous', // Default to 'Anonymous'
      email: data['email'] || 'No email provided', // Default email
      accountType: data['accountType'] || 'anonymous', // Default account type
      roles: Array.isArray(data['roles']) ? data['roles'] : [], // Ensure roles is an array
    };
  }

  // Validates and sanitizes a profile before sending it to the backend.
  private validateOutgoingProfile(data: Partial<Profile>): Profile {
    if (!data.displayName || typeof data.displayName !== 'string') {
      throw new Error('Invalid profile: Display name is required and must be a string.');
    }
    if (!data.email || typeof data.email !== 'string') {
      throw new Error('Invalid profile: Email is required and must be a string.');
    }
    return {
      documentID: data.documentID || '', // Firestore will generate this automatically
      avatarURL: data.avatarURL || '', // Default to an empty string
      createdDate: data.createdDate || new Date(), // Default to the current date
      description: data.description || 'No description provided', // Default description
      displayName: data.displayName.trim(), // Ensure display name is trimmed
      email: data.email || '', // Default email
      accountType: data.accountType || 'anonymous', // Default account type
      roles: Array.isArray(data.roles) ? data.roles : ['user'], // Default role is 'user'
    };
  }
}
