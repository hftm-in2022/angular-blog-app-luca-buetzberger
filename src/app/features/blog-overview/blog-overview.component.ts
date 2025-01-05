// src\app\features\blog-overview\blog-overview.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../../core/services/blogpost.service';
import { BlogPost } from '../../core/models/blogpost.model';
import { Router, RouterModule } from '@angular/router';
import { BlogStateService } from '../../core/services/blog-state.service';

@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit {
  blogs: BlogPost[] = [];
  error = '';
  loading = true;

  constructor(
    private blogService: BlogPostService,
    private blogStateService: BlogStateService, // Inject the state service
    private router: Router, // Inject the router
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;

    // Fetch blogs from the BlogService and cache them in BlogStateService
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.blogStateService.setBlogs(blogs); // Cache the blogs
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
      },
    });
  }

  // Navigate to the blog detail page
  onBlogClick(blogId: string) {
    this.router.navigate(['/blog', blogId]); // Navigate to the blog detail page
  }

  // Track blogs by their documentID for performance optimization
  trackByDocumentID(index: number, blog: BlogPost): string {
    return blog.documentID;
  }
}
