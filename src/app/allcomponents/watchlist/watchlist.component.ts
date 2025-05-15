import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WatchMovie } from '../../models/watch-movie';
import { FavMoviesService } from '../../services/fav-movies.service';
import { Auth } from '@angular/fire/auth';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './watchlist.component.html',
  // styleUrl: './watchlist.component.css'
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent {
  imgUrl = 'https://image.tmdb.org/t/p/w500/';
  // movies!:WatchMovie[]
  movies: WatchMovie[] = [];
  @Input() movie: any;

  isFavorite: boolean = false;

  constructor(
    private favMoviesService: FavMoviesService,
    private auth: Auth,
    private toastr: ToastService
  ) {}

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

  async toggleFavorite() {
    const user = this.auth.currentUser;
    if (!user) {
      this.toastr.warning('Please sign in to add favorites');
      return;
    }
    if (!this.movie) {
      console.warn('No movie passed to the component!');
      return;
    }
    if (this.isFavorite) {
      await this.favMoviesService.removeFromFavoritesById(this.movie.id);
    } else {
      await this.favMoviesService.addToFavorites(this.movie);
    }

    this.isFavorite = !this.isFavorite;
  }
  public getAuthUser() {
    return this.auth.currentUser;
  }
  public get currentUser() {
    return this.auth.currentUser;
  }
}
