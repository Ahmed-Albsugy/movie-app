import { Injectable } from '@angular/core';
import axios from 'axios';
import { LanguageService } from './language.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = '01c9c486f4aa4b4947964212d7ff52d4';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private langService: LanguageService, private http: HttpClient) {}

  private get language(): string {
    return this.langService.getLanguage();
  }

  getNowPlaying(page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${this.language}&page=${page}`;
    return axios.get(url).then((res) => res.data);
  }

  getMovieDetails(id: number): Promise<any> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${this.language}`;
    return axios.get(url).then((res) => res.data);
  }

  getRecommendations(id: number): Promise<any> {
    const url = `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`;
    return axios.get(url).then((res) => res.data);
  }

  searchMovies(query: string, page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.language}&page=${page}`;
    return axios.get(url).then((res) => res.data);
  }

  getPopularMovies(page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=${this.language}&page=${page}`;
    return axios.get(url).then((res) => res.data);
  }

  //movie details
  getDataMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
