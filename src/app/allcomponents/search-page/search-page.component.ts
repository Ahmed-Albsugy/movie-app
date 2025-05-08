import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../../services/movies.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SearchformComponent } from '../searchform/searchform.component';
import { CardComponent } from '../card/card.component';
import { PaginationComponent } from './../pagination/pagination.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  imports: [
    HeaderComponent,
    SearchformComponent,
    PaginationComponent,
    NgFor,
    NgIf
  ]
})
export class SearchPageComponent {
  searchResults: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchTerm = query;
        this.searchMovies(1);
      }
    });
  }

  searchMovies(page: number) {
    this.moviesService.searchMovies(this.searchTerm, page).then((data: any) => {
      this.searchResults = data.results;
      this.totalPages = data.total_pages;
      this.currentPage = page;
    });
  }

  onPageChange(page: number) {
    this.searchMovies(page);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchMovies(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies(this.currentPage);
    }
  }

  trackById(index: number, movie: any): number {
    return movie.id;
  }
  onSearch(term: string) {
    this.searchTerm = term;
    this.searchMovies(1);
  }
}
