import { Component , AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var mdb: any;
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  login() {
    console.log('Login clicked!');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.rememberMe);
    // Add your auth logic here 
  }
  ngAfterViewInit() {
    if (typeof mdb !== 'undefined' && mdb.Input) {
      mdb.Input.init(); // re-initialize all inputs
    }
  }
}
