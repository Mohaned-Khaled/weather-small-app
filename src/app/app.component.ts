import { Component, OnInit, ViewChild } from '@angular/core';
import { Root } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherData?: Root;
  loading: boolean = false;
  theCity: string = 'cairo';
  errorMsg = null;
  @ViewChild('f') myForm?: NgForm;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getTheWeatherData();
    this.theCity = '';
  }

  onSearch() {
    this.getTheWeatherData();
    console.log(this.myForm);
  }

  private getTheWeatherData() {
    this.loading = true;
    this.weatherService.getWeatherData(this.theCity).subscribe(
      (data) => {
        this.loading = false;
        this.errorMsg = null;
        this.weatherData = data;
      },
      (error) => {
        this.loading = false;
        this.errorMsg = error;
      }
    );

    this.myForm?.reset();
  }
}
