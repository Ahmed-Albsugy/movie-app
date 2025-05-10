import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FavMoviesService {

  constructor(private firestore: Firestore) {}

  async addToFavorites(movie: any): Promise<void> {
  try {
    const favCollection = collection(this.firestore, 'FavMovies');

    const safeMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      timestamp: Date.now()
    };

    await addDoc(favCollection, safeMovie);
    console.log(' Movie added to Firestore:', safeMovie);
  } catch (error) {
    console.error(' Error adding movie:', error);
  }
}


  async removeFromFavoritesById(movieId: number): Promise<void> {
    const favCollection = collection(this.firestore, 'FavMovies');
    const q = query(favCollection, where('id', '==', movieId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      const docRef = doc(this.firestore, 'FavMovies', docSnap.id);
      await deleteDoc(docRef);
      console.log(` Movie ${movieId} removed from Firestore`);
    });
  }


}
