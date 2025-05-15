import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchform.component.html',
  styleUrl: './searchform.component.css',
})
export class SearchformComponent implements OnInit {
  searchInput: string = '';

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchInput = params['q'] || '';
    });
  }
  onSearchClick() {
    if (this.searchInput.trim()) {
      // Emit الكلمة للـ SearchPageComponent
      this.search.emit(this.searchInput);

      // أو تنقله مباشرة بالرابط كـ query param
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchInput },
      });
    }
  }
}
