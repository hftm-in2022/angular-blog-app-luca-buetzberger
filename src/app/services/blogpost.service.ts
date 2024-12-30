// src\app\services\blog.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  DocumentData,
  docData,
  doc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  getBlogs(): Observable<BlogPost[]> {
    console.log('Fetching blogposts...');
    // Change 'blogs' to 'blogposts' to match your Firebase collection name
    const blogsCollection = collection(this.firestore, 'blogposts');
    const blogsQuery = query(blogsCollection, orderBy('publishedDate', 'desc'));

    return collectionData(blogsQuery, { idField: 'documentID' }).pipe(
      map((blogs: DocumentData[]) => {
        console.log('Raw blogposts data:', blogs);
        return blogs.map((blog: DocumentData) => {
          console.log('Processing blog:', blog);
          return {
            documentID: blog['documentID'] || '',
            title: blog['title'] || '',
            content: blog['content'] || '',
            category: blog['category'] || '',
            publishedDate: blog['publishedDate']?.toDate() || null,
            imageURL: blog['imageURL'] || '',
            audioURL: blog['audioURL'] || '',
            userUID: blog['userUID'] || '',
            likes: blog['likes'] || '0',
          } as BlogPost;
        });
      }),
    );
  }

  getBlogById(blogId: string): Observable<BlogPost> {
    const blogDoc = doc(this.firestore, 'blogposts', blogId);
    return docData(blogDoc, { idField: 'documentID' }).pipe(
      map((blog: DocumentData) => {
        return {
          documentID: blog['documentID'] || '',
          title: blog['title'] || '',
          content: blog['content'] || '',
          category: blog['category'] || '',
          publishedDate: blog['publishedDate']?.toDate() || null,
          imageURL: blog['imageURL'] || '',
          audioURL: blog['audioURL'] || '',
          userUID: blog['userUID'] || '',
          likes: blog['likes'] || '0',
        } as BlogPost;
      }),
    );
  }
}
