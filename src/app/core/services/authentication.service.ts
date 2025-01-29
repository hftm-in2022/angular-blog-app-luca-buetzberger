// src\app\core\services\authentication.service.ts

/**
 * AuthenticationService
 * This service manages user authentication using Firebase. It provides methods for logging in,
 * registering, logging out, and resetting passwords. It also tracks the current user's state
 * and ensures the app knows whether a user is logged in or not.
 */

import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  signInAnonymously,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<User | null>(null); // Observable to track the current user state
  user$: Observable<User | null> = this.userSubject.asObservable(); // Exposes the user state as an observable
  private authStateResolved = false; // Tracks whether Firebase has resolved the authentication state

  // wäre eine Idee um aus einem observer ein Observable zu machen
  authState$ = new Observable<User | null>((subscriber) => {
    const unsubscribe = this.auth.onAuthStateChanged(
      (user) => {
        subscriber.next(user);
      },
      (error) => {
        subscriber.error(error);
      },
    );

    return () => unsubscribe();
  });

  constructor(private auth: Auth) {
    // Listen to Firebase authentication state changes
    this.auth.onAuthStateChanged((user) => {
      this.authStateResolved = true; // Mark auth state as resolved
      this.userSubject.next(user); // Emit the current user
      console.log('AuthenticationService: Authentication state changed. Current user:', user);
    });
  }

  // Waits for Firebase to resolve the authentication state.
  // This ensures the app knows whether a user is logged in or not before proceeding.
  // returns A promise that resolves with the current user or null.
  async waitForAuthState(): Promise<User | null> {
    if (this.authStateResolved) {
      // imperativer Ansatz. Besser deklarativer Ansatz wählen
      console.log('AuthenticationService: Authentication state already resolved.'); // keine logs in produktivem Code
      return this.userSubject.value; // Return the current user if already resolved.
      // .value sollte nicht aufgerufen werden, besser observables verknüpfen
      // return gibt gar kein Promise zurück
    }

    console.log('AuthenticationService: Waiting for authentication state to resolve...');
    return new Promise((resolve) => {
      const subscription = this.user$.subscribe((user) => {
        // besser lastValueFrom verwenden um aus einem observable ein Promise zu machen…
        if (this.authStateResolved) {
          console.log('AuthenticationService: Authentication state resolved. Current user:', user);
          resolve(user);
          subscription.unsubscribe(); // Clean up subscription
        }
      });
    });
  }

  // Anonymous Login
  async loginAnonymously(): Promise<void> {
    try {
      console.log('AuthenticationService: Attempting anonymous login...');
      const result = await signInAnonymously(this.auth);
      this.userSubject.next(result.user); // Update the user observable
      console.log('AuthenticationService: Anonymous login successful. User:', result.user);
    } catch (error) {
      console.error('AuthenticationService: Anonymous login failed:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  // Google Login
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      console.log('AuthenticationService: Attempting Google login...');
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user); // Update the user observable
      console.log('AuthenticationService: Google login successful. User:', result.user);
    } catch (error) {
      console.error('AuthenticationService: Google login failed:', error);
      throw error;
    }
  }

  // Login with Email and Password
  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      console.log('AuthenticationService: Attempting email login...'); // zuviele logs macht den code unleserlich
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(result.user); // Update the user observable
      console.log('AuthenticationService: Email login successful. User:', result.user);
    } catch (error) {
      console.error('AuthenticationService: Email login failed:', error);
      throw error;
    }
  }

  // Register with Email and Password
  async registerWithEmail(email: string, password: string): Promise<void> {
    try {
      console.log('AuthenticationService: Attempting user registration...');
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(result.user); // Update the user observable
      console.log('AuthenticationService: Registration successful. User:', result.user);
    } catch (error) {
      console.error('AuthenticationService: Registration failed:', error);
      throw error;
    }
  }

  // Send Password Reset Email
  async sendPasswordResetEmail(email: string): Promise<void> {
    // warum verwendest du hier nicht einfach sendPasswordResetEmail aus dem firebase sdk? Nur für die logs?
    try {
      console.log('AuthenticationService: Attempting to send password reset email to:', email);
      await sendPasswordResetEmail(this.auth, email); // namenskonflikt macht code schwer lesbar
      console.log('AuthenticationService: Password reset email sent successfully to:', email);
    } catch (error) {
      // das catch ist nur für den log?
      console.error('AuthenticationService: Failed to send password reset email:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      console.log('AuthenticationService: Attempting to log out...');
      await signOut(this.auth);
      this.userSubject.next(null); // Clear the user observable
      console.log('AuthenticationService: Logout successful.');
    } catch (error) {
      console.error('AuthenticationService: Logout failed:', error);
      throw error;
    }
  }
}

// sehr viel code und viele logs, welches den code schwer lesbar macht. Ist nur ein Wrapper über Firebase SDK.
