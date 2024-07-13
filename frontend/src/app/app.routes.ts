import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { pagesRoutes } from './pages/pages.routes';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: pagesRoutes,
  },
  {
    path: '**',
    redirectTo: 'produto',
    pathMatch: 'full',
  },
];
