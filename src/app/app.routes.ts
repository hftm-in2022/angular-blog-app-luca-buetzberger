// src\app\app.routes.ts

import { Routes } from '@angular/router';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { BlogDetailResolver } from './features/blog-detail/blog-detail-resolver';
import { ProfileResolver } from './features/user-profile-page/profile-resolver';
import { authenticationGuard } from './core/guards/authentication.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { authorizationUserGuard } from './core/guards/authorization-user.guard';
import { BlogOverviewResolver } from './features/blog-overview/blog-overview.resolver';

export const routes: Routes = [
  { path: 'overview', component: BlogOverviewComponent, resolve: { blogs: BlogOverviewResolver }, runGuardsAndResolvers: 'always' },
  { path: 'demo', loadComponent: () => import('./features/demo-page/demo-page.component').then((c) => c.DemoPageComponent) },
  {
    path: 'blog/:id',
    loadComponent: () => import('./features/blog-detail/blog-detail.component').then((c) => c.BlogDetailComponent),
    resolve: { blog: BlogDetailResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./features/user-profile-page/profile-page.component').then((c) => c.ProfilePageComponent),
    resolve: { profile: ProfileResolver },
    runGuardsAndResolvers: 'always',
  },
  { path: 'registration', loadComponent: () => import('./features/registration-page/registration-page.component').then((c) => c.RegistrationPageComponent) },
  {
    path: 'createBlog',
    loadComponent: () => import('./features/create-blog/create-blog.component').then((c) => c.CreateBlogComponent),
    canActivate: [authenticationGuard, authorizationUserGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/overview' },
];

// { path: 'demo', component: DemoPageComponent },
// { path: 'registration', component: RegistrationPageComponent },
// { path: 'profile/:id', component: ProfilePageComponent, resolve: { profile: ProfileResolver }, runGuardsAndResolvers: 'always' },
// { path: 'blog/:id', component: BlogDetailComponent, resolve: { blog: BlogDetailResolver }, runGuardsAndResolvers: 'always' },
// { path: 'createBlog', component: CreateBlogComponent, canActivate: [authenticationGuard, authorizationUserGuard], runGuardsAndResolvers: 'always' },
