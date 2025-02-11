import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrNic: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.emailOrNic || !this.password) {
      alert('Email/NIC and password are required!');
      return;
    }

    this.authService.login({ emailOrNic: this.emailOrNic, password: this.password })
      .subscribe({
        next: (data) => {
          console.log('Login successful!', data);
          
          this.router.navigate(['/dashboard']);},

        error: (err) => {

          alert('Login Failed! ' + err.error.message)
        }
      });
  }
}
