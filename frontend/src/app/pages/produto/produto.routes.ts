import { Routes } from '@angular/router';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoConsultaComponent } from './produto-consulta/produto-consulta.component';

export const produtoRoutes: Routes = [
  {
    path: 'produto',
    children: [
      {
        path: 'consulta',
        component: ProdutoConsultaComponent,
      },
      {
        path: 'cadastro',
        component: ProdutoCadastroComponent,
      },
      {
        path: 'cadastro/:id',
        component: ProdutoCadastroComponent,
      },
      {
        path: '**',
        redirectTo: 'consulta',
        pathMatch: 'full',
      },
    ],
  },
];
