import { Routes } from '@angular/router';
<<<<<<< Updated upstream

export const routes: Routes = [];
=======
import { HomePageComponent} from './allcomponents/home-page/home-page.component';
import { WatchlistComponent } from './allcomponents/watchlist/watchlist.component';
import { LoginComponent } from './allcomponents/login/login.component';
import { CardComponent } from './allcomponents/card/card.component';
import { SignupComponent } from './allcomponents/signup/signup.component';

export const routes: Routes = [
  {path:'home-page', component:HomePageComponent},
  {path:'watchlist',component:WatchlistComponent },
  {path :'login', component:LoginComponent},
  {path : 'signup' , component : SignupComponent},
  {path :'card',component:CardComponent},
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'home-page' }
];
>>>>>>> Stashed changes
