import { Component, OnInit } from '@angular/core';
import { SearchformComponent } from '../searchform/searchform.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../../services/movies.service';
import { CardComponent } from '../card/card.component';
import { PaginationComponent } from './../pagination/pagination.component';
import { LanguageService } from '../../services/language.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    SearchformComponent,
    HttpClientModule,
    CardComponent,
    PaginationComponent,
    NgFor,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  popularMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  supportedLanguages: string[] = [];
  selectedLanguage: string = 'en';

  constructor(
    private moviesService: MoviesService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loadPopularMovies();
    this.loadNowPlayingMovies();
    this.supportedLanguages = this.languageService.getSupportedLanguages();
    this.selectedLanguage = this.languageService.getLanguage();
  }

  loadPopularMovies() {
    this.moviesService.getPopularMovies(this.currentPage).then((data) => {
      this.popularMovies = data.results;
      this.totalPages = data.total_pages;
    });
  }

  loadNowPlayingMovies() {
    this.moviesService.getNowPlaying().then((data) => {
      this.nowPlayingMovies = data.results;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPopularMovies();
  }

  trackById(index: number, movie: any): number {
    return movie.id;
  }

  onLanguageChange(lang: string) {
    this.languageService.setLanguage(lang);
    this.selectedLanguage = lang;
    // إعادة تحميل البيانات باللغة الجديدة
    this.loadPopularMovies();
    this.loadNowPlayingMovies();
  }

  getLanguageName(lang: string): string {
    switch (lang) {
      case 'en':
        return 'English';
      case 'ar':
        return 'العربية';
      case 'fr':
        return 'Français';
      case 'zh':
        return '中文';
      default:
        return lang;
    }
  }

  handleLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.onLanguageChange(lang);
  }

  get welcomeTitle(): string {
    switch (this.selectedLanguage) {
      case 'ar':
        return 'مرحبًا بك في تطبيق الأفلام الخاص بنا';
      case 'fr':
        return 'Bienvenue dans notre application de films';
      case 'zh':
        return '欢迎使用我们的电影应用';
      default:
        return 'Welcome to our movie app';
    }
  }

  get welcomeSubtitle(): string {
    switch (this.selectedLanguage) {
      case 'ar':
        return 'ملايين من الأفلام، والمسلسلات، والشخصيات لتكتشفها. استكشف الآن.';
      case 'fr':
        return 'Des millions de films, séries et personnes à découvrir. Explorez maintenant.';
      case 'zh':
        return '数以百万计的电影、电视剧和人物等你发现。立即探索。';
      default:
        return 'Millions of movies, TV shows and people to discover. Explore now.';
    }
  }
}
