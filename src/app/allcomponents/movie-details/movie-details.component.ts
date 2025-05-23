import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FavMoviesService } from '../../services/fav-movies.service';
import { Auth } from '@angular/fire/auth';
import { CardComponent } from '../card/card.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-movie-details',
  imports: [RouterModule, CommonModule, CardComponent],
  templateUrl: './movie-details.component.html',
  standalone: true,
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movies: any[] = [];

  movieId!: number;
  movieDetails: any;
  recommendedMovies: any[] = [];
  maxRecommended = 4;
  movie: any;
  isFavorite: boolean = false;

  private readonly apiKey = '01c9c486f4aa4b4947964212d7ff52d4';
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private favMoviesService: FavMoviesService,
    private auth: Auth,
    private toastr: ToastService
  ) {}

  async ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieId) {
      this.http
        .get<any>(
          `${this.baseUrl}/movie/${this.movieId}?api_key=${this.apiKey}`
        )
        .subscribe((data) => {
          this.movieDetails = data;
        });
      this.http
        .get<{ results: any[] }>(
          `${this.baseUrl}/movie/${this.movieId}/recommendations?api_key=${this.apiKey}`
        )
        .subscribe((data) => {
          this.recommendedMovies = data.results;
        });
    }
    this.isFavorite = await this.checkIfFavorite();
  }
  ngOnChanges(): void {
    this.movie.favorite = this.movie.favorite || false; // add this default
  }
  loadMore(): void {
    this.maxRecommended += 4;

    if (this.maxRecommended > this.recommendedMovies.length) {
      this.maxRecommended = this.recommendedMovies.length;
    }
  }

  openedDropdownIndex: number | null = null;

  toggleDropdown(index: number): void {
    this.openedDropdownIndex =
      this.openedDropdownIndex === index ? null : index;
  }
  trackById(index: number, movie: any): number {
    return movie.id;
  }

  // toggleFavorite(movie: any): void {
  //   movie.favorite = !movie.favorite;
  // }

  // goToMovieDetails(id: number): void {
  //   // علشان ينتقل لصفحة تفاصيل الفيلم
  //   this.router.navigate(['/movie', id]);
  // }
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
  async checkIfFavorite(): Promise<boolean> {
    try {
      const favorites = await this.favMoviesService.getFavoriteMovies();
      return favorites.some((fav) => fav.id === this.movieId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }

  public getAuthUser() {
    return this.auth.currentUser;
  }
  public get currentUser() {
    return this.auth.currentUser;
  }
}

// http://localhost:4200/movie/27205
// http://localhost:4200/movie/27205
