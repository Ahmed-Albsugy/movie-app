import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() movies: any[] = []; // هنا نستقبل movies من الأب

  constructor(private router: Router , private wishlistService: WishlistService) {}

  trackById(index: number, movie: any): number {
    return movie.id;
  }

  openedDropdownIndex: number | null = null;

  toggleDropdown(index: number): void {
    this.openedDropdownIndex =
      this.openedDropdownIndex === index ? null : index;
  }

  // toggleFavorite(movie: any): void {
  //   movie.favorite = !movie.favorite;
  // }

  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }


  toggleFavorite(movie: any): void {
    this.wishlistService.toggleWishlist(movie);
  }

  isFavorite(movie: any): boolean {
    return this.wishlistService.isInWishlist(movie.id);
  }

  





}
