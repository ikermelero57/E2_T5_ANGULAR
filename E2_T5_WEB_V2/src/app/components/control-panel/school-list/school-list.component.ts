import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/bd.service';
import { School } from '../../../interface/school';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-school-list',
  imports: [MatCardModule,CommonModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent implements OnInit{
  ikastetxeak: School[] = []; // Usamos la interfaz School para tipar los datos

  constructor(private ApiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    this.ApiService.getSchools().subscribe({
      next: (data) => {
        this.ikastetxeak = data; // Asignamos los datos obtenidos a la propiedad ikastetxeak
      },
      error: (err) => {
        console.error('Error al cargar los ikastetxes:', err);
      }
    });
  }
  viewSchoolDetails(school: School) {
    this.router.navigate(['/school', school.CCEN]); // Redirige a la ruta anidada
  }
}
