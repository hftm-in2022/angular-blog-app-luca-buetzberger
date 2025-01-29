// src\app\features\blog-detail\blog-detail-resolver.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BlogPostService } from '../../core/services/blogpost.service';
import { BlogPost } from '../../core/models/blogpost.model';
import { BlogStateService } from '../../core/services/blog-state.service';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<BlogPost | null> {
  // ResolveFn anstelle Klasse verwenden
  constructor(
    private blogService: BlogPostService,
    private blogStateService: BlogStateService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BlogPost | null> {
    const blogId = route.paramMap.get('id');
    if (!blogId) {
      // kann nie null sein, da die route sonst nicht mached..
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
