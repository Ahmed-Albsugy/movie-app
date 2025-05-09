import { Routes } from '@angular/router';
import { HomePageComponent } from './allcomponents/home-page/home-page.component';
import { WatchlistComponent } from './allcomponents/watchlist/watchlist.component';
import { CardComponent } from './allcomponents/card/card.component';
import { MovieDetailsComponent } from './allcomponents/movie-details/movie-details.component';
import { Component } from '@angular/core';
import { SigninComponent } from './allcomponents/signin/signin.component';
import { SignupComponent } from './allcomponents/signup/signup.component';
import { VerifyEmailComponent } from './allcomponents/verify-email/verify-email.component';

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'card', component: CardComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'verify-email', component: VerifyEmailComponent },




  { path: 'card', component: CardComponent },
  // {path:'search',component:SearchPageComponent},
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'home-page' },
];
