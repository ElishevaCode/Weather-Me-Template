import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})

export class FavoritesPage implements OnInit{

  favorites: Location[] = [];
  currentWeather: CurrentWeather[] = [];
  location: Location;

  constructor(private favoritesService: FavoritesService, private router: Router, private weatherService: WeatherService,) { }

  ngOnInit(): void {
    this.resretFavoritesAndCurrentWeather()
  }

  resretFavoritesAndCurrentWeather(){
    this.favorites = this.favoritesService.getFavorites();
    this.favorites.forEach(location => {
      this.weatherService.getCurrentWeather(location.Key).subscribe(data => {
        this.currentWeather.push(data[0]);
      })
    });
  }

  selectedFavorit(favoriteKey: string){
    this.router.navigate(["search",favoriteKey]);
  }

  addFavorite(location: Location){
    this.favoritesService.addToFavorites(location);
    this.weatherService.getCurrentWeather(location.Key).subscribe(data => {
      this.currentWeather.push(data);
    })
  }

  toggleSelected(favoriteKey: string){
    this.favoritesService.removeFromFavorites(favoriteKey);
    this.resretFavoritesAndCurrentWeather();
  }
}
