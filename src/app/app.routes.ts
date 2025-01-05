// src\app\app.routes.ts

import { Routes } from '@angular/router';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { DemoPageComponent } from './features/demo-page/demo-page.component';
import { BlogDetailComponent } from './features/blog-detail/blog-detail.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { BlogDetailResolver } from './features/blog-detail/blog-detail-resolver';
import { ProfilePageComponent } from './features/user-profile-page/profile-page.component';
import { ProfileResolver } from './features/user-profile-page/profile-resolver';
import { RegistrationPageComponent } from './features/registration-page/registration-page.component';
import { authGuard } from './core/guards/auth.guard';
import { CreateBlogComponent } from './features/create-blog/create-blog.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: BlogOverviewComponent },
  { path: 'demo', component: DemoPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent, resolve: { blog: BlogDetailResolver } },
  { path: 'about', component: AboutPageComponent },
  { path: 'profile/:id', component: ProfilePageComponent, resolve: { profile: ProfileResolver } },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'createBlogPost', component: CreateBlogComponent, canActivate: [authGuard] }, // Protected route
  { path: 'error', component: ErrorPageComponent }, // Error page route
];
