// src\app\models\blogpost.model.ts
export interface BlogPost {
  documentID: string;
  title: string;
  content: string;
  category: string;
  publishedDate: Date;
  imageURL: string;
  audioURL: string;
  userUID: string;
  likes: number;
  geopoint: string;
}
