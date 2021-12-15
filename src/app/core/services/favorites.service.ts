import { Injectable } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Location[] = [];

  addToFavorites(location: Location): void {
    if(this.favorites.indexOf(location) == -1){
      this.favorites.push(location);
    }
    else{
      alert("the city exists in favorites")
    }
  }

  removeFromFavorites(locationKey: string): void {
    const cityToRemoveIndex = this.favorites.findIndex((favorite) => favorite.Key === locationKey);
    this.favorites.splice(cityToRemoveIndex, 1);
  }

  getFavorites(): Location[] {
    return this.favorites;
  }
}
