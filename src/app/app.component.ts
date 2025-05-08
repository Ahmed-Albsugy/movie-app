import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomePageComponent } from './allcomponents/home-page/home-page.component';
import { WatchlistComponent } from './allcomponents/watchlist/watchlist.component';
import { CardComponent } from './allcomponents/card/card.component';
import { HeaderComponent } from './allcomponents/header/header.component';
import { SearchformComponent } from './allcomponents/searchform/searchform.component';
import { MovieDetailsComponent } from './allcomponents/movie-details/movie-details.component';
import { SigninComponent } from './allcomponents/signin/signin.component';
import { SignupComponent } from './allcomponents/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HomePageComponent,
    SearchformComponent,
    WatchlistComponent,
    SigninComponent,
    SignupComponent,
    CardComponent,
    HeaderComponent,
    MovieDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'movie-app';
}
