// src\app\features\blog-detail\blog-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../core/services/blogpost.service';
import { ProfileService } from '../../core/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../models/blogpost.model';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  blog: BlogPost | undefined;
  profile: Profile | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogPostService,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    // Get the resolved blog post from the route
    this.blog = this.route.snapshot.data['blog'];

    // Fetch the profile of the blog author
    if (this.blog?.userUID) {
      this.profileService.getProfileById(this.blog.userUID).subscribe((profile) => {
        this.profile = profile;
      });
    }
  }

  onProfileClick(profileId: string): void {
    console.log('Avatar clicked:', profileId);
    // Add logic for avatar click (e.g., open profile page)
  }
}
