import { CommonModule } from '@angular/common';
import { MeetingTeacher } from './../../interface/meeting';
import { Component, OnInit } from '@angular/core';
import { Horario } from '../../interface/timetable';
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
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone:true,
  imports: [FormsModule,MatCardModule,MatTabsModule,MatTableModule,
    MatButtonModule, MatIconModule,MatFormFieldModule, MatInputModule,
    MatDividerModule,MatListModule,MatToolbarModule,CommonModule,TranslateModule
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{

  userName: string = '';
  userSurname: string = '';
  userDni: string = '';
  userDireccion:string = '';
  userTelefono: string = '';
  userRole: number | null = null;
  userImage: string = '';
  userId: number | null = null;
  horarios: Horario[] = [];
  reuniones: MeetingTeacher[] = [];
  weekDays: string[] = ['L/A', 'M/A', 'X', 'J/O', 'V/O']; // Días de la semana
  hours: number[] = [1, 2, 3, 4, 5]; // Horas del día
  searchTerm: string = ''; // Variable para la búsqueda
  students: any[] = []; // Lista de estudiantes
  filteredStudents: any[] = []; // Lista de estudiantes filtrados
  displayedColumns: string[] = ['hora', ...this.weekDays];


  constructor(private apiService: ApiService, private router:Router) {}

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
        this.apiService.getUsers().subscribe(
          (data: any) => {
            this.students = data.filter((student: any) => student.tipo_id === 4);
            console.log(this.students);
            this.filterStudents(); // Aplica el filtro después de cargar
          },
          (error) => {
            console.error('Error al cargar los estudiantes:', error);
          }
        );
      }
    } else {
      this.userName = 'Usuario Invitado';
    }
  }
  fetchStudents() {
    this.apiService.getUsers().subscribe(
      (data: any) => {
        this.students = data.filter((student: any) => student.tipo_id === 4);
        console.log(this.students);
        this.filterStudents(); // Aplica el filtro después de cargar
      },
      (error) => {
        console.error('Error al cargar los estudiantes:', error);
      }
    );
  }

  // Filtrar horarios por día y hora
  getHorariosForDayAndHour(day: string, hour: number): Horario[] {
    const horariosForThisHour = this.horarios.filter(
      (horario) => horario.dia === day && +horario.hora === hour
    );
    return horariosForThisHour.length > 0 ? [horariosForThisHour[0]] : [];
  }
  viewMeetingsDetails(reunionID:number){
    this.router.navigate(['/meeting-detail', reunionID]);
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student =>
      student.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
