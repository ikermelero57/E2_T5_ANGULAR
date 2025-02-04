import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/bd.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports:[MatCardModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Lista de usuarios

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar usuarios desde el servicio
  loadUsers() {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar los usuarios', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al cargar los usuarios:', err);
      },
    });
  }

  // Redirigir a la página de detalles de un usuario
  viewUserDetails(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  // Redirigir a la página de edición de un usuario
  editUser(userId: number) {
    this.router.navigate(['/edit-user', userId]);
  }

  // Eliminar un usuario
  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.loadUsers(); // Recargar la lista de usuarios
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al eliminar el usuario:', err);
        },
      });
    }
  }
}
