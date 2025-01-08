// src\app\features\blog-overview\blog-overview.resolver.ts

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../../core/models/blogpost.model';
import { BlogPostService } from '../../core/services/blogpost.service';

@Injectable({
  providedIn: 'root',
})
export class BlogOverviewResolver implements Resolve<BlogPost[]> {
  constructor(private blogPostService: BlogPostService) {}

  resolve(): Observable<BlogPost[]> {
    console.log('BlogsResolver: Resolving blogs...');
    return this.blogPostService.getBlogs(); // Fetch blogs from the service
  }
}
