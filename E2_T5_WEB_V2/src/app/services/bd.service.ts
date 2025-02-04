import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeetingStudent, MeetingTeacher } from '../interface/meeting';
import { Horario, HorarioIkasle } from '../interface/timetable';
import { School } from '../interface/school';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _schools: School[] = [];
  constructor(private http: HttpClient) {}

  // Agregar este método al ApiService
  validateUser(email: string, password: string): Observable<any>  {
    const loginData = { email, password };
    return this.http.post(`${environment.baseUrl}/users/login`, { email, password });
  }

  // getSchoolsById():Observable<Ikastetxeak>{
  //   return this.http.get<Ikastetxeak[]>(``);
  // }
  // getAllSchools():Observable<Ikastetxeak>{
  //   return this.http.get<Ikastetxeak[]>(``);


  getHorariosByProfeId(profeId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${environment.baseUrl}/horarios?profe_id=${profeId}`);
  }
  getHorariosByStudentId(ikasleId: number): Observable<HorarioIkasle[]> {
    return this.http.get<HorarioIkasle[]>(`${environment.baseUrl}/horarios-estudiante?estudiante_id=${ikasleId}`);
  }

  getReunionesByProfesorId(profesorId: number): Observable<MeetingTeacher[]> {
    return this.http.get<MeetingTeacher[]>(`${environment.baseUrl}/reuniones/profesor/${profesorId}`);
  }

  getReunionesByAlumnoId(estudianteId: number): Observable<MeetingStudent[]> {
    console.log('Fetching reuniones for estudianteId:', estudianteId);
    return this.http.get<MeetingStudent[]>(`${environment.baseUrl}/reuniones/estudiante/${estudianteId}`);
  }

  // getTodayMeetings(): Observable<any[]> {
  //   return this.http.get<any[]>('https://api.example.com/meetings?date=today'); // Asegúrate de ajustar la URL según tu API
  // }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${environment.baseUrlIkas}`); // Ajusta la URL según tu API
  }

  // USERS
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/users`);
  }

  getUserById(userId: number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.baseUrl}/users/${userId}`);
  }

  addUsers(data: any) {
    return this.http.post(`${environment.baseUrl}/users`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/users/update/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/users/delete/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/users/create`, data);
  }
}
