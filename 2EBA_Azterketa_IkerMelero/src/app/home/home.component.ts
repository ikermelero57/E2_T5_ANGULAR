import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/bd.service';
import { Autoak } from '../interface/autoak';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  autoak:Autoak[] = [];
  // userForm: FormGroup;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  sortOrder: 'asc' | 'desc' = 'asc';
  id: number = 0;
  marka: string = '';
  modeloa:string = '';
  errorMessage: string = '';
  autoa: any;


  constructor(private apiService:ApiService,private fb: FormBuilder){}

  ngOnInit(): void {
    this.apiService.getAllModeloak().subscribe(
      (data: Autoak[]) => {
        this.autoak = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al cargar los Autoak:', error);
      }
    );
  }
  // aukeratu(autoaId){
  //   //mostrar form con los datos
  //   if (userId) {
  //     this.apiService.getModeloaById(+autoaId).subscribe((autoa) => {
  //       this.autoa = autoa;
  //     });
  //   }
  // }
  aldatu(){
    // this.apiService.updateModeloak(this.id, this.marka).subscribe({

    // });
  }
  gehitu(){}
  ezabatu(autoaId:number){
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      console.log(autoaId);
      this.apiService.deleteModeloak(autoaId).subscribe({
        next: () => {
          console.log("DANA ONDO, EZABATU DA")
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
        },
      });
    }
  }

}
