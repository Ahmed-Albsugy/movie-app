import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { getAuth, sendEmailVerification } from 'firebase/auth';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  submitted = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Toast property
  showToast = false;
  toastMessage = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }


  get passwordMismatch(): boolean {
    if (!this.password || !this.repeatPassword) {
      return false;
    }
    return this.password !== this.repeatPassword;
  }
  // ====================================
  async onSubmit(form: any) {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid || this.passwordMismatch) {
      return;
    }
    try {
      // Create user account
      const userCredential = await this.authService.signUp(this.email, this.password);

      //  Update user profile with display name
      await this.authService.updateUserProfile(this.name);
      // toast message
      // this.toastService.showSuccess(`Welcome ${this.name}, you have successfully signed up!`);
      //  Send email verification
      const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      this.toastService.showSuccess(`Welcome ${this.name}! Please check your email to verify your account.`);
      this.successMessage = 'Signup successful! Please verify your email before logging in.';

      this.router.navigate(['/verify-email']);
    }

      // Reset form
      this.name = '';
      this.email = '';
      this.password = '';
      this.repeatPassword = '';
      this.submitted = false;
      form.resetForm();

      // Redirect to home after 2 seconds
      // this.router.navigate(['/home-page']);
      // setTimeout(() => {
      //   this.router.navigate(['/home-page']);
      // }, 2000);


    } catch (error: any) {
      console.error('Signup error:', error);
      this.errorMessage = this.getFriendlyErrorMessage(error.code);
    }

  }
  // ==============================================
  // Helper function for user-friendly error messages
  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      default:
        return 'An error occurred during signup. Please try again.';
    }
  }

}
