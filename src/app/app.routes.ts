import { Routes } from '@angular/router';
import { HomePageComponent } from './allcomponents/home-page/home-page.component';
import { WatchlistComponent } from './allcomponents/watchlist/watchlist.component';
import { LoginComponent } from './allcomponents/login/login.component';
import { CardComponent } from './allcomponents/card/card.component';
import { MovieDetailsComponent } from './allcomponents/movie-details/movie-details.component';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'card', component: CardComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'card', component: CardComponent },
  // {path:'search',component:SearchPageComponent},
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'home-page' },
];
