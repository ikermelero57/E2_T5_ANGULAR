import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/bd.service';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-details-user',
  imports: [MatCardModule,MatList,MatDivider,MatListItem,],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent implements OnInit{
  user: any;

  constructor(private location: Location,private router: Router,private route: ActivatedRoute, private apiService: ApiService,private snackBar: MatSnackBar) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la ruta
    if (userId) {
      this.apiService.getUserById(+userId).subscribe((user) => {
        this.user = user;
      });
    }
  }
  getTypeName(typeId: number): string {
    switch (typeId) {
      case 1:
        return 'God';
      case 2:
        return 'Administrador';
      case 3:
        return 'Profesor';
      case 4:
        return 'Estudiante';
      default:
        return 'Desconocido';
    }
  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }
  editUser() {
    // Redirigir a la página de edición del usuario
    this.router.navigate(['/edit-user', this.user.id]);
  }
  deleteUser() {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.apiService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/users']); // Redirigir a la lista de usuarios
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

