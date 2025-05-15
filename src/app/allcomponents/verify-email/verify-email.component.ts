import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  message: string = 'Please verify your email...';
  isChecking = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.startEmailCheckLoop();
  }

  async startEmailCheckLoop() {
    const auth = getAuth();

    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      const isVerified = auth.currentUser?.emailVerified;

      if (isVerified) {
        clearInterval(interval);
        this.authService.setUser(auth.currentUser); //updated user info to the header automatically

        this.message = 'Email verified! Redirecting to home page...';
        setTimeout(() => {
          this.router.navigate(['/home-page']);
        }, 1500);
      }
    }, 3000);
  }
}
