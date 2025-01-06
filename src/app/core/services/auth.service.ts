// src\app\core\services\auth.service.ts

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
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  private authStateResolved = false; // Tracks if Firebase has resolved the auth state

  constructor(private auth: Auth) {
    // Listen to authentication state changes
    this.auth.onAuthStateChanged((user) => {
      this.authStateResolved = true; // Auth state has been resolved
      this.userSubject.next(user); // Emit the current user
    });
  }

  // Wait for Firebase to resolve the authentication state
  async waitForAuthState(): Promise<User | null> {
    if (this.authStateResolved) {
      // If already resolved, return the current user
      return this.userSubject.value;
    }

    // Otherwise, wait for the first emission of the user state
    return new Promise((resolve) => {
      const subscription = this.user$.subscribe((user) => {
        if (this.authStateResolved) {
          resolve(user);
          subscription.unsubscribe(); // Clean up subscription
        }
      });
    });
  }

  // Anonymous Login
  async loginAnonymously(): Promise<void> {
    try {
      const result = await signInAnonymously(this.auth);
      this.userSubject.next(result.user);
    } catch (error) {
      console.error('Anonymous login failed:', error);
      throw error;
    }
  }

  // Google Login
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user);
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  // Login with Email and Password
  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(result.user); // Update the user observable
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    }
  }

  // Register with Email and Password
  async registerWithEmail(email: string, password: string): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(result.user); // Update the user observable
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Send Password Reset Email
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userSubject.next(null); // Clear the user observable
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
}
