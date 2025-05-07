import { Component } from '@angular/core';
import { SearchformComponent } from '../searchform/searchform.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, SearchformComponent, CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
