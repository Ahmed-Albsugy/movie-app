import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private supportedLanguages = ['en', 'ar', 'fr', 'zh'];
  private defaultLanguage = 'en';

  private languageSubject = new BehaviorSubject<string>(this.defaultLanguage);
  language$ = this.languageSubject.asObservable();

  constructor() {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      this.languageSubject.next(savedLang);
    }
  }

  setLanguage(lang: string) {
    if (this.supportedLanguages.includes(lang)) {
      this.languageSubject.next(lang);
      localStorage.setItem('app_language', lang);

      // Handle direction change
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
    }
  }

  getLanguage(): string {
    return this.languageSubject.getValue();
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }
}
