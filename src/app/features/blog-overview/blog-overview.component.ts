import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blogpost.model';

@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit {
  blogs: BlogPost[] = [];
  error = '';
  loading = true;

  constructor(private blogService: BlogService) {}

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
}
