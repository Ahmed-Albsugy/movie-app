import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '01c9c486f4aa4b4947964212d7ff52d4';
  private baseUrl = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
