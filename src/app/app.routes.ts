// src\app\app.routes.ts
import { Routes } from '@angular/router';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { DemoPageComponent } from './features/demo-page/demo-page.component';
import { BlogDetailComponent } from './features/blog-detail/blog-detail.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { ProfileResolver } from './features/user-profile-page/profile-resolver';
import { ProfilePageComponent } from './features/user-profile-page/profile-page.component';

export const routes: Routes = [
  { path: '', component: BlogOverviewComponent },
  { path: 'demo', component: DemoPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'about', component: AboutPageComponent },
  {
    path: 'profile/:id', // Route for the profile page
    component: ProfilePageComponent,
    resolve: {
      profile: ProfileResolver, // Attach the resolver to the route
    },
  },
];
