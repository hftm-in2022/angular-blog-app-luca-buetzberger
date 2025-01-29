// src\app\features\blog-detail\blog-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../core/services/blogpost.service';
import { ProfileService } from '../../core/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../core/models/blogpost.model';
import { Profile } from '../../core/models/profile.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  blog: BlogPost | undefined;
  profile: Profile | null | undefined;
  languages = ['en', 'de'];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogPostService,
    private profileService: ProfileService,
    private translate: TranslateService,
  ) {
    // Sprachen konfigurieren und Standard-Sprache setzen
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

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

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
