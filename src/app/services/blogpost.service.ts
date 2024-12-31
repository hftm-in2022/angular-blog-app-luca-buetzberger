// src\app\services\blog.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  docData,
  doc,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  // Fetch all blogs from Firestore
  getBlogs(): Observable<BlogPost[]> {
    console.log('Fetching blogposts from Firestore...');
    const blogsCollection = collection(this.firestore, 'blogposts');
    const blogsQuery = query(blogsCollection, orderBy('publishedDate', 'desc'));

    return collectionData(blogsQuery, { idField: 'documentID' }).pipe(
      map((blogs: DocumentData[]) =>
        blogs.map((blog: DocumentData) => ({
          documentID: blog['documentID'] || '',
          title: blog['title'] || '',
          content: blog['content'] || '',
          category: blog['category'] || '',
          publishedDate: blog['publishedDate']?.toDate() || null,
          imageURL: blog['imageURL'] || '',
          audioURL: blog['audioURL'] || '',
          userUID: blog['userUID'] || '',
          likes: blog['likes'] || 0,
        })),
      ),
    );
  }

  // Fetch a single blog by ID from Firestore
  getBlogById(blogId: string): Observable<BlogPost> {
    console.log('Fetching blogpost by ID from Firestore...');
    const blogDoc = doc(this.firestore, 'blogposts', blogId);
    return docData(blogDoc, { idField: 'documentID' }).pipe(
      map((blog: DocumentData) => ({
        documentID: blog['documentID'] || '',
        title: blog['title'] || '',
        content: blog['content'] || '',
        category: blog['category'] || '',
        publishedDate: blog['publishedDate']?.toDate() || null,
        imageURL: blog['imageURL'] || '',
        audioURL: blog['audioURL'] || '',
        userUID: blog['userUID'] || '',
        likes: blog['likes'] || 0,
      })),
    );
  }
}
