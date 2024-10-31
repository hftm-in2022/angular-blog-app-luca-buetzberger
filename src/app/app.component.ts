import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BlogService } from './services/blog.service';
import { BlogPost } from './models/blogpost.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  blogs: BlogPost[] = [];
  error = '';
  loading = true;

  constructor(private blogService: BlogService) {
    console.log('AppComponent constructed');
  }

  ngOnInit() {
    console.log('AppComponent initialized');
    this.loadBlogs();
  }

  loadBlogs() {
    console.log('Starting to load blogs');
    this.loading = true;
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        console.log('Successfully loaded blogs:', blogs);
        this.blogs = blogs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
      },
    });
  }
}
