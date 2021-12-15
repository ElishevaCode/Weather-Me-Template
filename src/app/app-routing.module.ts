import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPage } from './weather/weather/pages/search/search.page';

const routes: Routes = [
  {
    path: 'search',
    component: SearchPage,
  },
  {
    path: 'search/:locationKey', 
    loadChildren: () => import('./weather/weather/pages/search/search.page')
    .then(m => m.SearchPage), canLoad: [],
  },
  {
    path: 'favorites',
    loadChildren: () => import('./weather/weather/pages/favorites/favorites.page')
    .then(m => m.FavoritesPage), canLoad: [],
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
