import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeetingStudent, MeetingTeacher } from '../interface/meeting';
import { Horario, HorarioIkasle } from '../interface/timetable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3300'; // Cambiar por la IP de tu amigo si es necesario

  constructor(private http: HttpClient) {}

  // Agregar este método al ApiService
  validateUser(email: string, password: string): Observable<any>  {
    const loginData = { email, password };
    return this.http.post(`${this.baseUrl}/users/login`, { email, password });
  }

  getHorariosByProfeId(profeId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/horarios?profe_id=${profeId}`);
  }
  getHorariosByStudentId(ikasleId: number): Observable<HorarioIkasle[]> {
    return this.http.get<HorarioIkasle[]>(`${this.baseUrl}/horarios-estudiante?estudiante_id=${ikasleId}`);
  }

  getReunionesByProfesorId(profesorId: number): Observable<MeetingTeacher[]> {
    return this.http.get<MeetingTeacher[]>(`${this.baseUrl}/reuniones/profesor/${profesorId}`);
  }

  getReunionesByAlumnoId(estudianteId: number): Observable<MeetingStudent[]> {
    console.log('Fetching reuniones for estudianteId:', estudianteId);
    return this.http.get<MeetingStudent[]>(`${this.baseUrl}/reuniones/estudiante/${estudianteId}`);
  }

  // getTodayMeetings(): Observable<any[]> {
  //   return this.http.get<any[]>('https://api.example.com/meetings?date=today'); // Asegúrate de ajustar la URL según tu API
  // }

  // USERS
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  addUsers(data: any) {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  // CICLOS
  getCiclos() {
    return this.http.get(`${this.baseUrl}/ciclos`);
  }

  addCiclo(data: any) {
    return this.http.post(`${this.baseUrl}/ciclos`, data);
  }

  updateCiclo(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/ciclos/${id}`, data);
  }

  deleteCiclo(id: number) {
    return this.http.delete(`${this.baseUrl}/ciclos/${id}`);
  }

  // HORARIOS
  getHorarios() {
    return this.http.get(`${this.baseUrl}/horarios`);
  }

  addHorario(data: any) {
    return this.http.post(`${this.baseUrl}/horarios`, data);
  }

  updateHorario(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/horarios/${id}`, data);
  }

  deleteHorario(id: number) {
    return this.http.delete(`${this.baseUrl}/horarios/${id}`);
  }

  // MATRICULACIONES
  getMatriculaciones() {
    return this.http.get(`${this.baseUrl}/matriculaciones`);
  }

  addMatriculacion(data: any) {
    return this.http.post(`${this.baseUrl}/matriculaciones`, data);
  }

  updateMatriculacion(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/matriculaciones/${id}`, data);
  }

  deleteMatriculacion(id: number) {
    return this.http.delete(`${this.baseUrl}/matriculaciones/${id}`);
  }

  // MÓDULOS
  getModulos() {
    return this.http.get(`${this.baseUrl}/modulos`);
  }

  addModulo(data: any) {
    return this.http.post(`${this.baseUrl}/modulos`, data);
  }

  updateModulo(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/modulos/${id}`, data);
  }

  deleteModulo(id: number) {
    return this.http.delete(`${this.baseUrl}/modulos/${id}`);
  }

  // REUNIONES
  getReuniones() {
    return this.http.get(`${this.baseUrl}/reuniones`);
  }

  addReunion(data: any) {
    return this.http.post(`${this.baseUrl}/reuniones`, data);
  }

  updateReunion(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/reuniones/${id}`, data);
  }

  deleteReunion(id: number) {
    return this.http.delete(`${this.baseUrl}/reuniones/${id}`);
  }

  // TIPOS
  getTipos() {
    return this.http.get(`${this.baseUrl}/tipos`);
  }

  addTipo(data: any) {
    return this.http.post(`${this.baseUrl}/tipos`, data);
  }

  updateTipo(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/tipos/${id}`, data);
  }

  deleteTipo(id: number) {
    return this.http.delete(`${this.baseUrl}/tipos/${id}`);
  }
}
