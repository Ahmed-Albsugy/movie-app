import { Routes } from '@angular/router';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
import { HomePageComponent} from './allcomponents/home-page/home-page.component';
import { WatchlistComponent } from './allcomponents/watchlist/watchlist.component';
import { LoginComponent } from './allcomponents/login/login.component';
import { CardComponent } from './allcomponents/card/card.component';
import { SignupComponent } from './allcomponents/signup/signup.component';
import { EmptyWishListComponent } from './allcomponents/empty-wish-list/empty-wish-list.component';

export const routes: Routes = [
  {path:'home-page', component:HomePageComponent},
  {path:'watchlist',component:WatchlistComponent },
  {path :'login', component:LoginComponent},
  {path : 'signup' , component : SignupComponent},
  {path :'card',component:CardComponent},
  {path :'emptyWishList',component:EmptyWishListComponent},
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'home-page' }
<<<<<<< Updated upstream
];
=======
];

>>>>>>> Stashed changes
