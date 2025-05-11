import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  CollectionReference,
} from '@angular/fire/firestore';
import { Auth, User } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FavMoviesService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  private getUserId(): string {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return user.uid;
  }
  private getUserFavCollection(): CollectionReference {
    const userId = this.getUserId();
    return collection(this.firestore, `users/${userId}/FavMovies`);
  }
  async addToFavorites(movie: any): Promise<void> {
    try {
      const favCollection = this.getUserFavCollection();

      // Check if movie already exists
      const q = query(favCollection, where('id', '==', movie.id));
      const existing = await getDocs(q);

      if (!existing.empty) {
        console.log(' movie already in favorites, skipping add.');
        return;
      }

      const safeMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview,
        vote_count: movie.vote_count,
        timestamp: Date.now(),
      };

      await addDoc(favCollection, safeMovie);
      console.log(' Movie added to Firestore:', safeMovie);
    } catch (error) {
      console.error(' Error adding movie:', error);
    }
  }

  async removeFromFavoritesById(movieId: number): Promise<void> {
    try {
      const favCollection = this.getUserFavCollection();
      const q = query(favCollection, where('id', '==', movieId));
      const querySnapshot = await getDocs(q);

      for (const docSnap of querySnapshot.docs) {
        const docRef = doc(
          this.firestore,
          `users/${this.getUserId()}/FavMovies/${docSnap.id}`
        );
        await deleteDoc(docRef);
        console.log(`Movie ${movieId} removed from Firestore`);
      }
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  }

  // get all favorite movies from Firestore
  async getFavoriteMovies(): Promise<any[]> {
    try {
      const favCollection = this.getUserFavCollection();
      const querySnapshot = await getDocs(favCollection);

      return querySnapshot.docs.map((doc) => ({
        id: doc.data()['id'],
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
      return [];
    }
  }
}
