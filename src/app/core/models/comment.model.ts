// src\app\core\models\comment.model.ts

export interface BlogPost {
  documentID: string;
  blogID: string;
  content: string;
  publishedDate: Date;
  userUID: string;
}
