import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchformComponent } from "../searchform/searchform.component";

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [RouterModule, SearchformComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}
