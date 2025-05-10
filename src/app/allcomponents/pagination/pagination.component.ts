import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  constructor(private moviesService: MoviesService) {}

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  
  getPages(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + maxPagesToShow - 1);
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  
}
