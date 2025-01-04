// src\app\features\blog-detail\blog-detail-resolver.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BlogPostService } from '../../services/blogpost.service';
import { BlogPost } from '../../models/blogpost.model';
import { BlogStateService } from '../../services/blog-state.service';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<BlogPost | null> {
  constructor(
    private blogService: BlogPostService,
    private blogStateService: BlogStateService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BlogPost | null> {
    const blogId = route.paramMap.get('id');
    if (!blogId) {
      console.error('No blog ID provided in route.');
      return of(null);
    }

    // Check if the blog is already cached
    const cachedBlog = this.blogStateService.getBlogById(blogId);
    if (cachedBlog) {
      return of(cachedBlog); // Return cached blog
    }

    // Fetch from Firestore if not cached
    return this.blogService.getBlogById(blogId);
  }
}
