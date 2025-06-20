import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  {
    path: 'pokedex',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokedex/:id',
    loadComponent: () => import('./pokemon-detail/pokemon-detail.page').then( m => m.PokemonDetailPage),
    children: [
      {
        path: '',
        loadComponent: () => import('./pokemon-detail/tabs/pokemon-tabs.component').then(m => m.PokemonTabsComponent),
        children: [
          {
            path: 'stats',
            loadComponent: () => import('./pokemon-detail/tabs/stats/tabs-stats.component').then(m => m.PokemonsStatsComponent)
          },
          {
            path: 'skills',
            loadComponent: () => import('./pokemon-detail/tabs/skills/tabs-skills.component').then(m => m.PokemonSkillsComponent)
          },
          {
            path: 'evolution',
            loadComponent: () => import('./pokemon-detail/tabs/evolution/tabs-evolution.component').then(m => m.PokemonEvolutionComponent)
          }
        ]
      }
    ]
  },
  
];

export const AppProviders = [
  provideHttpClient(),
]