// src\app\models\profile.model.ts
export interface Profile {
  documentID: string;
  avatarURL: string;
  createdDate: Date;
  description: string;
  displayName: string;
  email: string;
  accountType: string;
}
