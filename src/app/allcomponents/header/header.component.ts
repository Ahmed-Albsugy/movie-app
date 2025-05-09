import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons';



@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.displayName || null;
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
