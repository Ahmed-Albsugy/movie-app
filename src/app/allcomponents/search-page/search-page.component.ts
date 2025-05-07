import { MoviesService } from './../../services/movies.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SearchformComponent } from '../searchform/searchform.component';
import { CardComponent } from '../card/card.component';
import { PaginationComponent } from './../pagination/pagination.component';

@Component({
  selector: 'app-search-page',
  imports: [
    HeaderComponent,
    SearchformComponent,
    CardComponent,
    PaginationComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  searchResults: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {}

  onSearch(term: string) {
    this.searchTerm = term;
    this.searchMovies(this.currentPage);
  }

  searchMovies(page: number) {
    // this.moviesService.searchMovies(this.searchTerm, page).then((data: any) => {
    //   this.searchResults = data.results;
    //   this.totalPages = data.total_pages;
    //   this.currentPage = page;
    // });
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
}
