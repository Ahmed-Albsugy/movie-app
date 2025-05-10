import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getAuth } from 'firebase/auth';

// import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  isEmailVerified: boolean = false;
  currentRoute: string = '';

  wishlistCount=5;




  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });


    this.authService.currentUser.subscribe(async (user) => {
      this.isLoggedIn = !!user;
      this.userName = user?.displayName || null;
      //Check email verification
      if (user) {
        const auth = getAuth();
        await auth.currentUser?.reload();// refresh the data
        this.isEmailVerified = auth.currentUser?.emailVerified ?? false;
      } else {
        this.isEmailVerified = false;
      }
    });
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/signin']);
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  }

  

}
