import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


// import { firebaseConfig } from '../environments/firebase-config';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),provideHttpClient(), 
     provideFirebaseApp(() => initializeApp({ 
       projectId: "movie-app-17c38",
       appId: "1:930164385938:web:65f8f42fd09cba02c0de4b", 
       storageBucket: "movie-app-17c38.firebasestorage.app", 
       apiKey: "AIzaSyBmGjJtDA1topR1VksKaw4zER36u9eBdDg", 
       authDomain: "movie-app-17c38.firebaseapp.com",
        messagingSenderId: "930164385938" })), 
        provideAuth(() => getAuth()), 
        provideFirestore(() => getFirestore())]
 
};
