import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WatchMovie } from '../../models/watch-movie';
import { FavMoviesService } from '../../services/fav-movies.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './watchlist.component.html',
  // styleUrl: './watchlist.component.css'
  styleUrls: ['./watchlist.component.css']
})

export class WatchlistComponent {

  imgUrl = 'https://image.tmdb.org/t/p/w500/'
  // movies!:WatchMovie[]
  movies: WatchMovie[] = [];


  constructor(private favMoviesService: FavMoviesService) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  // display movies from firestore 
  async loadWatchlist() {
    try {
      this.movies = await this.favMoviesService.getFavoriteMovies();
    } catch (error) {
      console.error(' Failed to load favorites from Firestore:', error);
    }
  }





}
