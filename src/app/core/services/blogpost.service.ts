// src\app\core\services\blogpost.service.ts

/**
 * BlogPostService
 * This service handles all operations related to blog posts, including fetching, creating,
 * and uploading images. It interacts with Firebase Firestore for data storage and Firebase Storage
 * for file uploads. It also ensures that only authenticated users can create blog posts.
 */

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, docData, doc, DocumentData, addDoc } from '@angular/fire/firestore';
import { Observable, firstValueFrom, map } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { getDownloadURL, ref, StorageReference, uploadBytes, Storage } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthenticationService,
  ) {}

  // Fetches all blog posts from Firestore, ordered by the published date in descending order.
  getBlogs(): Observable<BlogPost[]> {
    console.log('BlogPostService: Fetching all blog posts from Firestore...');
    const blogsCollection = collection(this.firestore, 'blogposts');
    const blogsQuery = query(blogsCollection, orderBy('publishedDate', 'desc'));
    return collectionData(blogsQuery, { idField: 'documentID' }).pipe(
      map((blogs: (DocumentData | undefined)[]) =>
        blogs
          .filter((blog): blog is DocumentData => blog !== undefined) // Filter out undefined
          .map((blog) => this.validateIncomingBlogPost(blog)),
      ),
    );
  }

  // Fetches a single blog post by its ID from Firestore.
  getBlogById(blogId: string): Observable<BlogPost> {
    console.log(`BlogPostService: Fetching blog post with ID '${blogId}' from Firestore...`);
    const blogDoc = doc(this.firestore, 'blogposts', blogId);
    return docData(blogDoc, { idField: 'documentID' }).pipe(
      map((blog: DocumentData | undefined) => {
        if (!blog) {
          throw new Error(`Blog post with ID '${blogId}' not found.`);
        }
        return this.validateIncomingBlogPost(blog);
      }),
    );
  }

  // Uploads an image file to Firebase Storage and returns its download URL.
  async uploadImage(file: File | null): Promise<string> {
    if (!file) {
      console.error('BlogPostService: No file selected for upload.');
      throw new Error('No file selected for upload.');
    }
    const filePath = `blogpost_images/${file.name}`;
    const storageRef: StorageReference = ref(this.storage, filePath);
    try {
      console.log(`BlogPostService: Uploading image '${file.name}' to Firebase Storage...`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('BlogPostService: Image uploaded successfully. Download URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('BlogPostService: Error uploading image:', error);
      throw error;
    }
  }

  // Creates a new blog post in Firestore. Only authenticated users can create blog posts.
  async createBlogPost(blogPost: Partial<BlogPost>): Promise<void> {
    try {
      console.log('BlogPostService: Checking if user is authenticated...');
      const currentUser = await firstValueFrom(this.authService.user$);

      if (!currentUser) {
        console.error('BlogPostService: No authenticated user found.');
        throw new Error('No authenticated user found. Please log in.');
      }

      console.log('BlogPostService: Validating blog post data...');
      const validatedBlogPost = this.validateOutgoingBlogPost({
        ...blogPost,
        userUID: currentUser.uid, // Add the current user's UID
      });

      console.log('BlogPostService: Creating a new blog post...');
      const postsCollection = collection(this.firestore, 'blogposts');
      await addDoc(postsCollection, validatedBlogPost);
      console.log('BlogPostService: Blog post created successfully.');
    } catch (error) {
      console.error('BlogPostService: Error creating blog post:', error);
      throw error;
    }
  }

  // Validates and sanitizes a blog post received from the backend.
  private validateIncomingBlogPost(data: DocumentData): BlogPost {
    return {
      documentID: data['documentID'] || '', // Ensure the ID is a string
      title: data['title'] || 'Untitled Blog Post', // Default title
      content: data['content'] || 'No content provided.', // Default content
      category: data['category'] || 'Uncategorized', // Default category
      publishedDate: data['publishedDate']?.toDate() || new Date(), // Ensure valid date
      imageURL: data['imageURL'] || '', // Default to empty string
      audioURL: data['audioURL'] || '', // Default to empty string
      userUID: data['userUID'] || '', // Ensure the user UID is a string
      likes: typeof data['likes'] === 'number' ? data['likes'] : 0, // Default to 0 if not a number
      geopoint: data['geopoint'] || '', // Default to empty string
    };
  }

  // Validates and sanitizes a blog post before sending it to the backend.
  private validateOutgoingBlogPost(data: Partial<BlogPost>): BlogPost {
    if (!data.title || typeof data.title !== 'string') {
      throw new Error('Invalid blog post: Title is required and must be a string.');
    }
    if (!data.content || typeof data.content !== 'string') {
      throw new Error('Invalid blog post: Content is required and must be a string.');
    }
    return {
      documentID: '',
      title: data.title,
      content: data.content,
      category: data.category || '',
      publishedDate: data.publishedDate || new Date(),
      imageURL: data.imageURL || '',
      audioURL: data.audioURL || '',
      userUID: data.userUID || '',
      likes: data.likes || 0,
      geopoint: data.geopoint || '',
    };
  }
}
