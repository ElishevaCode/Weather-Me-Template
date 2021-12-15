import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { SearchPage } from './pages/search/search.page';


const routes: Routes = [
  {
    path: 'search',
    component: SearchPage,
  },
  {
    path: 'search/:locationKey', 
    component: SearchPage,
  },
  {
    path: 'favorites',
    component: FavoritesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
