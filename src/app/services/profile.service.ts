// src\app\services\profile.service.ts
import { Injectable } from '@angular/core';
import { Firestore, DocumentData, docData, doc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private firestore: Firestore) {}

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
}
