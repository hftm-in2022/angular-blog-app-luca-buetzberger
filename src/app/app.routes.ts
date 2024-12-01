import { Routes } from '@angular/router';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { DemoPageComponent } from './features/demo-page/demo-page.component';

export const routes: Routes = [
  { path: '', component: BlogOverviewComponent },
  { path: 'demo', component: DemoPageComponent },
];
