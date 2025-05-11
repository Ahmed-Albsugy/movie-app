import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './allcomponents/movie-details/movie-details.component';
import { HeaderComponent } from './allcomponents/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, MovieDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'movie-app';
}
