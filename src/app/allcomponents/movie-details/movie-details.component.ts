import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-movie-details',
  imports: [ RouterModule, CommonModule, CardComponent],
  templateUrl: './movie-details.component.html',
  standalone: true,
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movieDetails: any;
  recommendedMovies: any[] = [];
  maxRecommended = 6;

  private readonly apiKey = '01c9c486f4aa4b4947964212d7ff52d4';
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
  }
  loadMore(): void {
    this.maxRecommended += 6;

    if (this.maxRecommended > this.recommendedMovies.length) {
      this.maxRecommended = this.recommendedMovies.length;
    }
  }

  openedDropdownIndex: number | null = null;

  toggleDropdown(index: number): void {
    this.openedDropdownIndex =
      this.openedDropdownIndex === index ? null : index;
  }

  toggleFavorite(movie: any): void {
    movie.favorite = !movie.favorite;
  }

  goToMovieDetails(id: number): void {
    // علشان ينتقل لصفحة تفاصيل الفيلم
    this.router.navigate(['/movie', id]);
  }
}

// http://localhost:4200/movie/27205
// http://localhost:4200/movie/27205
