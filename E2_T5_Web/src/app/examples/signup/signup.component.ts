import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/bd.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    email: string = '';
    password: string = '';
    errorMessage: string = '';
    constructor(private apiService: ApiService, private router: Router) {}

    ngOnInit() {}
    login() {
      // Verificamos que los datos no estén vacíos
      if (this.email && this.password) {
        // Llamamos al servicio validateUser
        this.apiService.validateUser(this.email, this.password).subscribe({
          next: (response: any) => {
            if (response.success) {
              alert('Login successful'+ response);
              
              // Comprobar el tipo_id y redirigir a la página correspondiente
              if (response.tipo_id === 1) {
                this.router.navigate(['/admin']); // Redirige al componente admin
              } else if (response.tipo_id === 3) {
                this.router.navigate(['/irakasle']); // Redirige al componente irakasle
              } else if (response.tipo_id === 4) {
                this.router.navigate(['/ikasle']); // Redirige al componente ikasle
              } else {
                this.errorMessage = 'Invalid user type';
              }
            } else {
              // Si el login falla, muestra el error
              this.errorMessage = 'Invalid email or password';
            }
          },
          error: (err) => {
            // Manejar errores de conexión
            console.error('Error:', err);
            this.errorMessage = 'An error occurred. Please try again.';
          }
        });
      } else {
        this.errorMessage = 'Please enter both email and password';
      }
    }
}

