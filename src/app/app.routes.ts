// src\app\app.routes.ts

import { Routes } from '@angular/router';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { DemoPageComponent } from './features/demo-page/demo-page.component';
import { BlogDetailComponent } from './features/blog-detail/blog-detail.component';
import { BlogDetailResolver } from './features/blog-detail/blog-detail-resolver';
import { ProfilePageComponent } from './features/user-profile-page/profile-page.component';
import { ProfileResolver } from './features/user-profile-page/profile-resolver';
import { RegistrationPageComponent } from './features/registration-page/registration-page.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { CreateBlogComponent } from './features/create-blog/create-blog.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { authorizationUserGuard } from './core/guards/authorization-user.guard';
import { BlogOverviewResolver } from './features/blog-overview/blog-overview.resolver';

export const routes: Routes = [
  { path: 'overview', component: BlogOverviewComponent, resolve: { blogs: BlogOverviewResolver }, runGuardsAndResolvers: 'always' },
  { path: 'demo', component: DemoPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent, resolve: { blog: BlogDetailResolver }, runGuardsAndResolvers: 'always' },
  { path: 'profile/:id', component: ProfilePageComponent, resolve: { profile: ProfileResolver }, runGuardsAndResolvers: 'always' },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'createBlog', component: CreateBlogComponent, canActivate: [authenticationGuard, authorizationUserGuard], runGuardsAndResolvers: 'always' }, // Protected route
  { path: 'error', component: ErrorPageComponent }, // Error page route
  { path: '**', redirectTo: '/overview' },
];
