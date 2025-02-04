import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/bd.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // Para mat-input
import { MatOptionModule } from '@angular/material/core'; // Para mat-option

@Component({
  selector: 'app-edit-user',
  imports:[MatFormFieldModule,MatSelectModule,MatCardModule,ReactiveFormsModule,
          CommonModule,MatInputModule,MatOptionModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: number = 0;
  tipos: any[] = []; // Lista de tipos de usuario

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    // // Cargar tipos de usuario
    // this.apiService.getTipos().subscribe((tipos) => {
    //   this.tipos = tipos;
    // });

    // Cargar datos del usuario
    this.apiService.getUserById(this.userId).subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.apiService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al actualizar el usuario:', err);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
