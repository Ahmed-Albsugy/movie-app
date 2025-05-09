import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WatchMovie } from '../../models/watch-movie';
import { WatchMovieService } from '../../services/watch-movie.service';

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


  constructor(private movieService: WatchMovieService) { }

  ngOnInit(): void {
    this.displayMovies()
  }

  displayMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (res) => {
        console.log(res.results);
        this.movies = res.results;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }


}
