import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/bd.service';

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
    constructor(private apiService: ApiService) {}

    ngOnInit() {}
    login() {
        // Verificamos que los datos no estén vacíos
        if (this.email && this.password) {
          // Llamamos al servicio validateUser
          this.apiService.validateUser(this.email, this.password).subscribe({
            next: (response: any) => {
              if (response.success) {
               
                alert('Login successful');
                // Redirigir a otro lugar, si es necesario
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
