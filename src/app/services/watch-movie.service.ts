import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchMovieService {

  constructor( private http:HttpClient) { }

  getMovies():Observable<any>{
    // return this.http.get(``)
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=01c9c486f4aa4b4947964212d7ff52d4`)
 }
 
}

