import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/bd.service';
import { MeetingStudent } from '../../interface/meeting';
import { HorarioIkasle } from '../../interface/timetable';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  userName: string = '';
  userSurname: string = '';
  userRole: number | null = null;
  userImage: string = '';
  userId: number | null = null;
  horarios: HorarioIkasle[] = [];
  reuniones: MeetingStudent[] = [];
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
        this.apiService.getHorariosByStudentId(this.userId).subscribe(
            (data: HorarioIkasle[]) => {
              this.horarios = data;
              console.log(data);
            },
            (error) => {
              console.error('Error al cargar los horarios:', error);
            }
          );
        this.apiService.getReunionesByAlumnoId(this.userId).subscribe(
          (data: MeetingStudent[]) => {
            this.reuniones = data;
            console.log(data);
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
  getHorariosForDayAndHour(day: string, hour: number): HorarioIkasle[] {
    return this.horarios.filter((horario) => horario.Dia === day && +horario.Hora === hour);
  }
}
