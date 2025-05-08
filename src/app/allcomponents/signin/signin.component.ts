import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { FormsModule,NgForm  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-signin',
  imports: [ RouterModule,FormsModule , CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})


export class SigninComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


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
      
      // Redirect to home page after successful login
      this.router.navigate(['/home-page']);
      
    } catch (error: any) {
      console.error('Login error:', error);
      // this.errorMessage = this.getFriendlyErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }

    // ===========================
    // Helper function for user-friendly error messages
  // private getFriendlyErrorMessage(code: string): string {
  //     switch (code) {
  //       case 'auth/invalid-email':
  //         return 'Invalid email address.';
  //       case 'auth/user-disabled':
  //         return 'This account has been disabled.';
  //       case 'auth/user-not-found':
  //         return 'No account found with this email.';
  //       case 'auth/wrong-password':
  //         return 'Incorrect password. Please try again.';
  //       case 'auth/too-many-requests':
  //         return 'Too many attempts. Account temporarily locked.';
  //       default:
  //         return 'Login failed. Please try again later.';
  //     }
  //   }


  }
 
 
}
