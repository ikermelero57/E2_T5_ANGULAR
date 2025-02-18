import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autoak } from '../interface/autoak';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private _schools: School[] = [];
  private _autoak:Autoak[] = [];
  constructor(private http: HttpClient) {}

  getAllModeloak():Observable<Autoak[]>{
      return this.http.get<Autoak[]>(`http://localhost:3000/autoak`);
  }

  // updateModeloak(id: number, marka: string, modeloa:string): Observable<any> {
  //   return this.http.put(`http://localhost:3000/autoak/update/${id}`, marka, modeloa);
  // }

  deleteModeloak(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/autoak/delete/${id}`);
  }

  createModeloak(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/autoak/create`, data);
  }

}
