import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../services/bd.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // Para mat-input
import { MatOptionModule } from '@angular/material/core'; // Para mat-option
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-create-user',
  imports:[MatFormFieldModule,CommonModule,MatInputModule,MatOptionModule,MatSelectModule,
    MatCardModule, ReactiveFormsModule
   ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  tipos: any[] = []; // Lista de tipos de usuario

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [''],
      tipo_id: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  generateRandomId(): number {
    return Math.floor(100000 + Math.random() * 900000); // Ejemplo: 123456
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.id = this.generateRandomId();
      this.apiService.createUser(userData).subscribe({
        next: () => {
          this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.snackBar.open('Error al crear el usuario', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al crear el usuario:', err);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
