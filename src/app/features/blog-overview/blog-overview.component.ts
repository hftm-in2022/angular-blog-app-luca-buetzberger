// src\app\features\blog-overview\blog-overview.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blogpost.model';
import { Router, RouterModule } from '@angular/router';

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
    private blogService: BlogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
      },
    });
  }

  // onBlogClick(blogId: string) {
  //   this.router.navigate(['/blog', blogId]);
  // }
}
