import { Injectable } from '@angular/core';
import axios from 'axios';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = '01c9c486f4aa4b4947964212d7ff52d4';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private langService: LanguageService) {}

  private get language(): string {
    return this.langService.getLanguage();
  }

  getNowPlaying(page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${this.language}&page=${page}`;
    return axios.get(url).then(res => res.data);
  }

  getMovieDetails(id: number): Promise<any> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${this.language}`;
    return axios.get(url).then(res => res.data);
  }

  getRecommendations(id: number): Promise<any> {
    const url = `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`;
    return axios.get(url).then(res => res.data);
  }

  searchMovies(query: string): Promise<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.language}`;
    return axios.get(url).then(res => res.data);
  }

  getPopularMovies(page: number = 1): Promise<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=${this.language}&page=${page}`;
    return axios.get(url).then(res => res.data);
  }
}
