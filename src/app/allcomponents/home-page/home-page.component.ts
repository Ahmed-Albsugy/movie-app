import { Component } from '@angular/core';
import { SearchformComponent } from '../searchform/searchform.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone:true,
  imports: [RouterModule,SearchformComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
