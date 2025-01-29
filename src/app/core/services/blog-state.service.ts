// src\app\core\services\blog-state.service.ts

import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogStateService {
  private blogs: BlogPost[] = []; // Cache for blog posts

  // Set blogs (called when fetching all blogs)
  setBlogs(blogs: BlogPost[]): void {
    this.blogs = blogs;
  }

  // Get all cached blogs
  getBlogs(): BlogPost[] {
    return this.blogs;
  }

  // Get a specific blog by ID
  getBlogById(blogId: string): BlogPost | undefined {
    return this.blogs.find((blog) => blog.documentID === blogId);
  }

  // Clear the cache (optional, e.g., on logout)
  clearCache(): void {
    this.blogs = [];
  }
}

// keine Reaktivität in dieser state Klasse. Signals oder Observables wäre hier die bessere Wahl.
