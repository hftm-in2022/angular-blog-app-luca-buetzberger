// src\app\features\blog-overview\blog-overview.component.ts

/**
 * BlogOverviewComponent
 * This component displays a list of blogs in a grid layout. It fetches blogs from the backend
 * using the BlogPostService. It also handles loading, error states, and navigation to individual blog details.
 */

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../core/models/blogpost.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogCardComponent } from '../../shared/blog-card/blog-card.component';

@Component({
  selector: 'app-blog-overview',
  imports: [CommonModule, RouterModule, BlogCardComponent],
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit {
  blogs: BlogPost[] = [];
  error = '';
  loading = true; // Start with loading set to true

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadBlogs();
  }

  // Load blogs from the resolver
  loadBlogs(): void {
    try {
      this.blogs = this.route.snapshot.data['blogs']; // Get resolved blogs
      console.log('BlogOverviewComponent: Blogs loaded successfully.', this.blogs);
    } catch (err) {
      console.error('BlogOverviewComponent: Failed to load blogs.', err);
      this.error = 'Failed to load blogs. Please try again later.';
    } finally {
      this.loading = false; // Stop loading after blogs are loaded or an error occurs
    }
  }

  // Navigates to the blog detail page when a blog is clicked
  onBlogClick(blogId: string): void {
    console.log(`BlogOverviewComponent: Navigating to blog detail page for blog ID: ${blogId}`);
    this.router.navigate(['/blog', blogId]);
  }
}

// export class BlogOverviewComponent implements OnInit {
//   blogs: BlogPost[] = []; // Array to store the list of blogs
//   error = ''; // Error message for failed API calls
//   loading = true; // Loading state for the component

//   constructor(
//     private blogService: BlogPostService, // Service to fetch blogs
//     private blogStateService: BlogStateService, // Service to cache blogs
//     private router: Router // Router for navigation
//   ) {}

//   ngOnInit(): void {
//     this.loadBlogs(); // Load blogs when the component initializes
//   }

//   // Fetches blogs from the BlogPostService and caches them in BlogStateService.
//   // Handles loading and error states.
//   loadBlogs(): void {
//     console.log('BlogOverviewComponent: Fetching blogs...');
//     this.loading = true;

//     this.blogService.getBlogs().subscribe({
//       next: (blogs) => {
//         console.log('BlogOverviewComponent: Blogs fetched successfully.', blogs);
//         this.blogs = blogs;
//         this.blogStateService.setBlogs(blogs); // Cache the blogs in the state service
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('BlogOverviewComponent: Failed to fetch blogs.', err);
//         this.error = 'Failed to load blogs. Please try again later.';
//         this.loading = false;
//       },
//     });
//   }

//   // Navigates to the blog detail page when a blog is clicked.
//   onBlogClick(blogId: string): void {
//     console.log(`BlogOverviewComponent: Navigating to blog detail page for blog ID: ${blogId}`);
//     this.router.navigate(['/blog', blogId]);
//   }
// }
