import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/bd.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {

  }
  login(){
    if (this.name && this.password) {
      console.log("paso");
      if(this.name == "user" || this.name == "admin"){
        if(this.password = "12345"){
          localStorage.setItem('user', JSON.stringify(this.name));
          this.router.navigate(['/home']);
        }else{
          this.errorMessage = 'Invalid email or password';
        }

      }else{
        this.errorMessage = 'Invalid email or password';
      }

    }else{
      this.errorMessage = 'Invalid email or password';
    }



  }
}
