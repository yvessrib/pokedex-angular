import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokedex',
    loadComponent: () => import('./pokedex/pokedex.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokedex/:id',
    loadComponent: () => import('./pokemon-detail/pokemon-detail.page').then( m => m.PokemonDetailPage)
  },
];
