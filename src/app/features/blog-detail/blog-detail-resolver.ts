// src\app\features\blog-detail\blog-detail-resolver.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlogService } from '../../services/blogpost.service';
import { BlogPost } from '../../models/blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<BlogPost | null> {
  constructor(private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BlogPost | null> {
    const blogId = route.paramMap.get('id');
    if (!blogId) {
      console.error('No blog ID provided in route.');
      return of(null); // Return null if no blog ID is provided
    }

    return this.blogService.getBlogById(blogId).pipe(
      catchError((error) => {
        console.error('Error fetching blog post:', error);
        return of(null); // Return null if there is an error
      }),
    );
  }
}
