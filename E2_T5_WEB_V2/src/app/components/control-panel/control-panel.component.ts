import { Component } from '@angular/core';
import { ApiService } from '../../services/bd.service';
import { CommonModule } from '@angular/common';
import { School } from '../../interface/school';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-control-panel',
  standalone:true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  usersCount: { [key: number]: number } = {};
  todayMeetingsCount: number = 0;
  firstFourUsers: any[] = [];
  firstFourSchools: School[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadUsersCount();
    this.loadFirstFourUsers();
    //this.loadTodayMeetingsCount();
    this.loadFirstFourSchools();
  }

  loadUsersCount() {
    this.apiService.getUsers().subscribe((users: any[]) => {
      this.usersCount = users.reduce((acc, user) => {
        acc[user.tipo_id] = (acc[user.tipo_id] || 0) + 1;
        return acc;
      }, {} as { [key: number]: number });
      console.log(this.usersCount);
    });
  }

  loadFirstFourUsers() {
    this.apiService.getUsers().subscribe((users: any[]) => {
      // Obtén los primeros 4 usuarios
      this.firstFourUsers = users.slice(0, 4);
      console.log(this.firstFourUsers);
    });
  }

  loadFirstFourSchools() {
    this.apiService.getSchools().subscribe((schools: School[]) => {
      this.firstFourSchools = schools.slice(0, 4); // Usa la variable correcta y el nombre
      console.log('Escuelas:', this.firstFourSchools);
    });
  }

// loadTodayMeetingsCount() {
  //   this.apiService.getTodayMeetingsCount().subscribe(count => {
  //     this.todayMeetingsCount = count;
  //   });
  // }

  viewUserDetails(user: any) {
    this.router.navigate(['/user', user.id]); // Redirige a la ruta anidada
  }

  // Método para manejar el botón "Ver más" de escuelas
  viewSchoolDetails(school: School) {
    this.router.navigate(['/school', school.CCEN]); // Redirige a la ruta anidada
  }

  viewUserList() {
    this.router.navigate(['/users']); // Redirige a la ruta anidada
  }

  // Método para manejar el botón "Ver más" de escuelas
  viewSchoolsList() {
    this.router.navigate(['/schools']); // Redirige a la ruta anidada
  }

}
