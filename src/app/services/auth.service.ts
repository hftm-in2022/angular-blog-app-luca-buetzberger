// src\app\services\auth.service.ts

import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    // Listen to authentication state changes
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  // Google Login
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user); // Update the user observable
    } catch (error) {
      console.error('Google login failed:', error);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userSubject.next(null); // Clear the user observable
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
