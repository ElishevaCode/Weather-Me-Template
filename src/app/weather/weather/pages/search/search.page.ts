import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { LocationService } from 'src/app/core/services/location.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit{
  
  location: Location;
  forecast: Forecast;
  currentWeather: CurrentWeather;
  autocompleteLocation: Observable<Location[]>;
  
  selected: boolean = false;

  constructor( private weatherService: WeatherService, private locationService: LocationService, 
    private favoritesService: FavoritesService, private router: Router, 
    private activatedRoute: ActivatedRoute,private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    //get location - Tel Aviv
    this.changeLocation("215854");

    this.activatedRoute.params.subscribe(params => {
      var locationKey = params['locationKey'] || '';
      if(locationKey != ''){
        this.changeLocation(locationKey);
        this.selected = true;
      }
    })
  }

  changeLocation(locationKey: string){
    this.locationService.getLocationByKey(locationKey).subscribe(data => {
      this.location = data;
    }, err =>{
      this.openSnackBar("can't get location")
    })
    this.weatherService.getForecast(locationKey).subscribe(data => {
      this.forecast = data;
    }, err => {
      this.openSnackBar("can't get forecast")
    })
    this.weatherService.getCurrentWeather(locationKey).subscribe(data => {
      this.currentWeather = data;
    }, err => {
      this.openSnackBar("can't get CurrentWeather")
    })
    this.selected = false;
  }

  toggleSelected() {
    this.selected = !this.selected;
    if(this.selected == true){
      this.favoritesService.addToFavorites(this.location);
      this.openSnackBar("add to favorite!");
    }
    else{
      this.favoritesService.removeFromFavorites(this.location.Key);
      this.openSnackBar(this.location.LocalizedName+" remove from favorite!")
    }
  }

  changeTemperatureUnit() {
    this.weatherService.isMetric = !this.weatherService.isMetric;

    this.weatherService.temperatureUnitChanged.next();

    this.changeLocation(this.location.Key);
  }

  keyPress(event){
    var inp = String.fromCharCode(event.keyCode);
    if (! /[a-zA-Z]/.test(inp)) {
      event.preventDefault();
    } 
  }

  searchLocation(text: string){
    this.autocompleteLocation = this.locationService.getAutocompleteLocation(text);
  }

  locationSelected(locationKey: string){
    this.changeLocation(locationKey);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

}

