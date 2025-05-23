import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
  User,
  signOut,
  authState,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();
  // currentUser: Observable<User | null>;

  constructor(private auth: Auth) {
    // this.currentUser = authState(this.auth);
    authState(this.auth).subscribe(async (user) => {
      if (user) {
        await user.reload(); // always get latest info (e.g. emailVerified & displayName)
      }
      this.currentUserSubject.next(user);
    });
  }

  // Manually update user (e.g. after verification)
  setUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // logout(): Promise<void> {
  //   return this.auth.signOut();
  // }
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // get currentUser() {
  //   return this.auth.currentUser;
  // }

  // update user profile
  async updateUserProfile(displayName: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, { displayName });
    }
    throw new Error('No user logged in');
  }
}
