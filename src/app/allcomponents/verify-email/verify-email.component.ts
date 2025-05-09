import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  message: string = 'Please verify your email...';
  isChecking = false;

  constructor(private router: Router) {}

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
        this.message = 'Email verified! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 1500);
      }
    }, 3000); // 🔁 Check every 3 seconds
  }
}
