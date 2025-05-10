import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { getAuth, updateProfile } from 'firebase/auth';




@Component({
  selector: 'app-signin',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})


export class SigninComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  // Toast property
  showToast = false;
  toastMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }


  // //////// validate email

  get emailInvalid(): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.email !== '' && !re.test(this.email);
  }
  // //////// validate password

  get passwordInvalid(): boolean {
    if (this.password === '') return false;
    return !(
      this.password.length >= 8 &&
      /[a-z]/.test(this.password) &&
      /[A-Z]/.test(this.password) &&
      /\d/.test(this.password) &&
      /[\W_]/.test(this.password)
    );
  }
  // ==============================================

  async login(form: NgForm) {
    this.submitted = true;
    this.errorMessage = '';

    // Validate form
    if (form.invalid || this.emailInvalid || this.passwordInvalid) {
      return;
    }
    this.isLoading = true;

    try {
      // Sign in with email/password
      await this.authService.signIn(this.email, this.password);
      // 2. Get the display name from Firebase Auth
      const auth = getAuth();
      await auth.currentUser?.reload(); // refresh user data
      const currentUser = auth.currentUser;
      const displayName = currentUser?.displayName || 'User';

      // this.toastService.showSuccess(`Welcome ${displayName}, you have successfully signed in!`);
      // // Redirect to home page after successful login
      // this.router.navigate(['/home-page']);
      const isVerified = auth.currentUser?.emailVerified;
      if (!isVerified) {
        this.toastService.showSuccess('Please verify your email before logging in.');
        return;
      }
      // ✅ Verified → Redirect to home
      this.toastService.showSuccess(`Welcome ${displayName}, you have successfully signed in!`);
      await auth.currentUser?.reload();
      this.router.navigate(['/home-page']);

    } 
    catch (error: any) {

      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.errorMessage = 'Incorrect email or password.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Invalid email address.';
          break;

        case 'auth/too-many-requests':
          this.errorMessage = 'Too many failed attempts. Try again later.';
          break;

        default:
          this.errorMessage = 'Login failed. Please try again.';
          break;

      }
        this.toastService.showSuccess(this.errorMessage);

    }
    // finally {
    //   this.isLoading = false;
    // }



  }


}
