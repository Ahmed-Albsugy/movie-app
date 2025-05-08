import { CommonModule } from '@angular/common';
import { Component,AfterViewInit  } from '@angular/core';
import { FormsModule,NgForm  } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var mdb: any;


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
  login() {
    if (this.emailInvalid || this.passwordInvalid) {
      return; // stop submission
    }
    console.log('Logging in with', this.email, this.password);
  }
 
  ngAfterViewInit() {
    if (typeof mdb !== 'undefined' && mdb.Input) {
      mdb.Input.init(); // re-initialize all inputs
    }
  }
}
