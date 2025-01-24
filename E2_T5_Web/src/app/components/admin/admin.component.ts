import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/services/bd.service';
import { MeetingTeacher } from '../../interface/meeting';
import { Horario } from '../../interface/timetable';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userName: string = '';
  userSurname: string = '';
  userRole: number | null = null;
  userImage: string = '';
  userId: number | null = null;
  horarios: Horario[] = [];
  reuniones: MeetingTeacher[] = [];
  weekDays: string[] = ['L/A', 'M/A', 'X', 'J/O', 'V/O']; // Días de la semana
  hours: number[] = [1, 2, 3, 4, 5]; // Horas del día
  

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.nombre;
      this.userId = userData.id;

      if (this.userId) {
        this.apiService.getHorariosByProfeId(this.userId).subscribe(
          (data: Horario[]) => {
            this.horarios = data;
            console.log(data);
          },
          (error) => {
            console.error('Error al cargar los horarios:', error);
          }
        );
        this.apiService.getReunionesByProfesorId(this.userId).subscribe(
          (data: MeetingTeacher[]) => {
            this.reuniones = data;
            console.log(this.reuniones);
          },
          (error) => {
            console.error('Error al cargar las reuniones:', error);
          }
        );
      }
    } else {
      this.userName = 'Usuario Invitado';
    }
  }

  // Filtrar horarios por día y hora
  getHorariosForDayAndHour(day: string, hour: number): Horario[] {
    return this.horarios.filter((horario) => horario.dia === day && +horario.hora === hour);
  }
}