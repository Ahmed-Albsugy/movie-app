import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchform.component.html',
  styleUrl: './searchform.component.css',
})
export class SearchformComponent {
  searchInput: string = '';

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) {}

  onSearchClick() {
    if (this.searchInput.trim()) {
      // Emit الكلمة للـ SearchPageComponent
      this.search.emit(this.searchInput);

      // أو تنقله مباشرة بالرابط كـ query param
      this.router.navigate(['/search'], { queryParams: { q: this.searchInput } });
    }
  }
}
