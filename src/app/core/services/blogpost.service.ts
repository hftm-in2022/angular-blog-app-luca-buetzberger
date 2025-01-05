// src\app\core\services\blogpost.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, docData, doc, DocumentData, addDoc } from '@angular/fire/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { getDownloadURL, ref, StorageReference, uploadBytes, Storage } from '@angular/fire/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthService,
  ) {}

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

  // Upload an image to Firebase Storage and return its URL
  async uploadImage(file: File | null): Promise<string> {
    if (!file) {
      throw new Error('No file selected');
    }

    const filePath = `blogpost_images/${file.name}`;
    const storageRef: StorageReference = ref(this.storage, filePath);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    return await getDownloadURL(snapshot.ref);
  }

  // Create a new blog post in Firestore
  async createBlogPost(blogPost: Partial<BlogPost>): Promise<void> {
    // Get the current user from the AuthService
    const currentUser = await firstValueFrom(this.authService.user$);

    if (!currentUser) {
      throw new Error('No authenticated user found. Please log in.');
    }

    // Ensure all required fields are set, and unused fields are left empty
    const newBlogPost: BlogPost = {
      documentID: '', // Firestore will generate this automatically
      title: blogPost.title || '',
      content: blogPost.content || '',
      category: blogPost.category || '',
      publishedDate: blogPost.publishedDate || new Date(),
      imageURL: blogPost.imageURL || '',
      audioURL: '', // Leave empty for now
      userUID: currentUser.uid || '',
      likes: 0, // Default to 0
      geopoint: '', // Leave empty for now
    };

    const postsCollection = collection(this.firestore, 'blogposts');
    await addDoc(postsCollection, newBlogPost);
  }
}
