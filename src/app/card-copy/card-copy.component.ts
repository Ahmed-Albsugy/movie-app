import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FavMoviesService } from '../services/fav-movies.service';
import { Auth } from '@angular/fire/auth';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-card-copy',
  imports: [CommonModule],
  templateUrl: './card-copy.component.html',
  styleUrl: './card-copy.component.css',
})
export class CardCopyComponent {
  @Input() movies: any[] = []; // هنا نستقبل movies من الأب
  @Input() movie: any;
  @Input() index!: number;
  isFavorite: boolean = false;
  openedDropdownIndex: number | null = null;

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Constructs a new CardComponent instance.
   *
   * @param router Used to navigate to the movie details page.
   * @param favMoviesService Used to check if a movie is in the user's favorite movies list.
   */
  /*******  fc248509-bbe5-4572-bd54-f85fd67dc710  *******/
  constructor(
    private router: Router,
    private favMoviesService: FavMoviesService,
    private auth: Auth,
    private toastr: ToastService
  ) {}
  async ngOnInit() {
    this.isFavorite = await this.checkIfFavorite();
  }
  async checkIfFavorite(): Promise<boolean> {
    try {
      const favorites = await this.favMoviesService.getFavoriteMovies();
      return favorites.some((fav) => fav.id === this.movie.id);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }
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

  // async toggleFavorite(movie: any): Promise<void> {
  //   movie.favorite = !movie.favorite;
  //   console.log(
  //     `Toggling favorite for: ${movie.title}, Now: ${movie.favorite}`
  //   );

  //   try {
  //     if (movie.favorite) {
  //       await this.favMoviesService.addToFavorites(movie);
  //     } else {
  //       await this.favMoviesService.removeFromFavoritesById(movie.id);
  //     }
  //   } catch (err) {
  //     console.error('🔥 Error in toggleFavorite:', err);
  //   }
  // }
  public getAuthUser() {
    return this.auth.currentUser;
  }
  public get currentUser() {
    return this.auth.currentUser;
  }
  async toggleFavorite() {
    const user = this.auth.currentUser;
    if (!user) {
      this.toastr.warning('Please sign in to add favorites');
      return;
    }
    if (!this.movie) {
      console.warn('No movie passed to the component!');
      return;
    }
    if (this.isFavorite) {
      await this.favMoviesService.removeFromFavoritesById(this.movie.id);
    } else {
      await this.favMoviesService.addToFavorites(this.movie);
    }

    this.isFavorite = !this.isFavorite;
  }

  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
  // toggleFavorite(movie: any): void {
  //   this.wishlistService.toggleWishlist(movie);
  // }
}
