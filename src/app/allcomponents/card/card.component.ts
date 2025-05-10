import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FavMoviesService } from '../../services/fav-movies.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() movies: any[] = []; // هنا نستقبل movies من الأب
  openedDropdownIndex: number | null = null;


  constructor(private router: Router, private favMoviesService: FavMoviesService) { }


  ngOnChanges(): void {
    this.movies.forEach((movie) => {
      movie.favorite = movie.favorite || false; // add this default
    });
  }

  trackById(index: number, movie: any): number {
    return movie.id;
  }


  toggleDropdown(index: number): void {
    this.openedDropdownIndex =
      this.openedDropdownIndex === index ? null : index;
  }

  // toggleFavorite(movie: any): void {
  //   movie.favorite = !movie.favorite;
  // }

  async toggleFavorite(movie: any): Promise<void> {
    movie.favorite = !movie.favorite;
    console.log(`Toggling favorite for: ${movie.title}, Now: ${movie.favorite}`);

    try {
      if (movie.favorite) {
        await this.favMoviesService.addToFavorites(movie);
      } else {
        await this.favMoviesService.removeFromFavoritesById(movie.id);
      }
    } catch (err) {
      console.error('🔥 Error in toggleFavorite:', err);
    }
  }

  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }


  // toggleFavorite(movie: any): void {
  //   this.wishlistService.toggleWishlist(movie);
  // }








}
