import { Routes } from '@angular/router';
import { produtoRoutes } from './produto/produto.routes';

export const pagesRoutes: Routes = [
  ...produtoRoutes,
  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full',
  },
];
