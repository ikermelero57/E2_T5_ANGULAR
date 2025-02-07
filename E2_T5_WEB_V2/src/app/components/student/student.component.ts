import { Component } from '@angular/core';
import { HorarioIkasle } from '../../interface/timetable';
import { MeetingStudent } from '../../interface/meeting';
import { ApiService } from '../../services/bd.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-student',
  standalone:true,
  imports: [FormsModule,MatCardModule,MatTabsModule,MatTableModule,
      MatButtonModule, MatIconModule,MatFormFieldModule, MatInputModule,
      MatDividerModule,MatListModule,MatToolbarModule,CommonModule,TranslateModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  userName: string = '';
  userSurname: string = '';
  userDni: string = '';
  userDireccion:string = '';
  userTelefono: string = '';
  userImage: string = '';
  userId: number | null = null;
  horarios: HorarioIkasle[] = [];
  reuniones: MeetingStudent[] = [];
  weekDays: string[] = ['L/A', 'M/A', 'X', 'J/O', 'V/O']; // Días de la semana
  hours: number[] = [1, 2, 3, 4, 5]; // Horas del día

  constructor(private apiService: ApiService,private router:Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.nombre;
      this.userSurname = userData.apellidos;
      this.userDni = userData.dni;
      this.userDireccion = userData.direccion;
      this.userTelefono = userData.telefono1;
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
  viewMeetingsDetails(reunionID:number){
    this.router.navigate(['/meeting-detail', reunionID]);
  }
}
