import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  constructor(private moviesService: MoviesService) {}
}
