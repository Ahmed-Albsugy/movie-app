import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [HttpClientModule, RouterModule, CommonModule],
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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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

    // تأكد ألا يزيد عن الطول الكامل
    if (this.maxRecommended > this.recommendedMovies.length) {
      this.maxRecommended = this.recommendedMovies.length;
    }
  }
}

// http://localhost:4200/movie/27205
