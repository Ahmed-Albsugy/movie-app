import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchformComponent } from "../searchform/searchform.component";
import { MoviesService } from '../../services/movies.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [RouterModule,NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  movies = signal<any[]>([]); // نستخدم signal عشان reactive

  constructor(private moviesService: MoviesService) {
    this.moviesService.getNowPlaying(1).then((data) => {
      this.movies.set(data.results); // تملي البيانات في signal
    });
  }
  
  trackById(index: number, movie: any): number {
    return movie.id;
  }
  
}
