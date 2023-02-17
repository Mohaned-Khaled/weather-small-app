import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Root } from '../models/weather.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(city: string) {
    return this.http
      .get<Root>(`https://api.openweathermap.org/data/2.5/weather`, {
        params: new HttpParams()
          .set('q', city)
          .set('units', 'metric')
          .set('appid', environment.weatherApiKey),
      })
      .pipe(
        catchError((error) => {
          return throwError('This City Does Not Exist, Try Again :)');
        })
      );
  }
}
