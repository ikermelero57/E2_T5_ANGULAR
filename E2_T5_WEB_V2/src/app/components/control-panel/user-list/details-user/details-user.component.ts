import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/bd.service';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-details-user',
  imports: [MatCardModule],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent {
  user: any;

  constructor(private location: Location,private route: ActivatedRoute, private apiService: ApiService) {}

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
}

