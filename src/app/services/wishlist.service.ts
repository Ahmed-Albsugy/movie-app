import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>([]);

  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {}

  addToWishlist(movie: any) {
    if (!this.isInWishlist(movie.id)) {
      this.wishlist.push(movie);
      this.wishlistSubject.next([...this.wishlist]);
    }
  }

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(movie => movie.id !== id);
    this.wishlistSubject.next([...this.wishlist]);
  }

  toggleWishlist(movie: any) {
    if (this.isInWishlist(movie.id)) {
      this.removeFromWishlist(movie.id);
    } else {
      this.addToWishlist(movie);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.some(movie => movie.id === id);
  }

  getWishlist(): any[] {
    return [...this.wishlist];
  }

  clearWishlist() {
    this.wishlist = [];
    this.wishlistSubject.next([]);
  }
}
