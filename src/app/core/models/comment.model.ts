// src\app\core\models\comment.model.ts

export interface Comment {
  documentID: string;
  blogID: string;
  content: string;
  publishedDate: Date;
  userUID: string;
}
