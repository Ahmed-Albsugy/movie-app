import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchformComponent } from '../searchform/searchform.component';
import { MoviesService } from '../../services/movies.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  movies = signal<any[]>([]); // نستخدم signal عشان reactive

  constructor(private moviesService: MoviesService, private router: Router) {
    this.moviesService.getNowPlaying(1).then((data) => {
      this.movies.set(data.results); // تملي البيانات في signal
    });
  }

  trackById(index: number, movie: any): number {
    return movie.id;
  }
  //  Dropdown list
  openedDropdownIndex: number | null = null;

  toggleDropdown(index: number): void {
    this.openedDropdownIndex =
      this.openedDropdownIndex === index ? null : index;
  }
  // Toggle Favorite
  moviesList = this.movies.set(
    this.movies().map((movie) => ({
      ...movie,
      favorite: false,
    }))
  );

  toggleFavorite(movie: any): void {
    movie.favorite = !movie.favorite;
  }
  // Movie details
  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
