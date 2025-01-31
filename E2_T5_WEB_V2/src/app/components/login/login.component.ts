import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/bd.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  hidePassword: boolean = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.email && this.password) {
      this.apiService.validateUser(this.email, this.password).subscribe({
        next: (response: any) => {
          if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
