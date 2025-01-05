// src\app\features\create-blog\create-blog.component.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedValidators } from '../../shared/validators/shared-validators.component';
import { BlogPostService } from '../../services/blogpost.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent implements OnInit {
  createBlogForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogPostService: BlogPostService,
  ) {}

  ngOnInit() {
    this.createBlogForm = this.fb.group({
      title: ['', [Validators.required, SharedValidators.blogPostTitle()]],
      content: ['', [Validators.required, SharedValidators.blogPostContent()]],
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Generate a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit() {
    if (this.createBlogForm.invalid) {
      return;
    }

    const { title, content } = this.createBlogForm.value;

    try {
      // Upload the image to Firebase Storage and get its URL
      const imageURL = await this.blogPostService.uploadImage(
        this.selectedFile,
      );

      // Create the blog post in Firestore
      await this.blogPostService.createBlogPost({
        title,
        content,
        imageURL,
        publishedDate: new Date(),
      });

      alert('Blog post created successfully!');
      this.createBlogForm.reset();
      this.imagePreview = null;
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    }
  }
}