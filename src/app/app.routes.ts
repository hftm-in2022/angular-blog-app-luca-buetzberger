// src\app\app.routes.ts
import { Routes } from '@angular/router';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { DemoPageComponent } from './features/demo-page/demo-page.component';
import { BlogDetailComponent } from './features/blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: BlogOverviewComponent },
  { path: 'demo', component: DemoPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
];
