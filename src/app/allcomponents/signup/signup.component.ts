import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule , FormsModule],
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

  get passwordMismatch(): boolean {
    if (!this.password || !this.repeatPassword) {
      return false;
    }
    return this.password !== this.repeatPassword;
  }
  
  onSubmit(form: any) {
    this.submitted = true;

    if (form.invalid || this.passwordMismatch) {
      return;
    }

    // Form is valid and passwords match — handle submission logic
    console.log('Form submitted successfully', form.value);
  }


}
