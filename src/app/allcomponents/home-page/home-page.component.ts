import { Component, OnInit } from '@angular/core';
import { SearchformComponent } from '../searchform/searchform.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../../services/movies.service';
import { CardComponent } from '../card/card.component';
import { PaginationComponent } from './../../pagination/pagination.component';


@Component({
  selector: 'app-home-page',
  standalone:true,
  imports: [RouterModule,SearchformComponent,HttpClientModule,CardComponent,PaginationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  popularMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.loadPopularMovies();
    this.loadNowPlayingMovies();
  }

  loadPopularMovies() {
    this.moviesService.getPopularMovies(this.currentPage).then(data => {
      this.popularMovies = data.results;
      this.totalPages = data.total_pages;
    });
  }

  loadNowPlayingMovies() {
    this.moviesService.getNowPlaying().then(data => {
      this.nowPlayingMovies = data.results;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPopularMovies();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPopularMovies();
    }
  }

  trackById(index: number, movie: any): number {
    return movie.id;
  }

}
