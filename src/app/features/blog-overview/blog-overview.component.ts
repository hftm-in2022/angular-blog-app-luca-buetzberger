// src\app\features\blog-overview\blog-overview.component.ts

/**
 * BlogOverviewComponent
 * This component displays a list of blogs in a grid layout. It fetches blogs from the backend
 * using the BlogPostService. It also handles loading, error states, and navigation to individual blog details.
 */

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../core/models/blogpost.model';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { BlogCardComponent } from '../../shared/blog-card/blog-card.component';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogCardComponent, TranslateModule],
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit, OnDestroy {
  blogs: BlogPost[] = [];
  error = '';
  loading = true;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private routerEventsSubscription!: Subscription;

  ngOnInit(): void {
    // Listen for router events to manage loading state
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true; // Start loading when navigation starts
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false; // Stop loading when navigation ends or is canceled
      }
    });
    this.loadBlogs();
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe(); // Clean up the subscription to avoid memory leaks
    }
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

  trackByBlogId(index: number, blog: BlogPost): string {
    return blog.documentID;
  }
}
