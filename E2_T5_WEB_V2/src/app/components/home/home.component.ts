import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GodComponent } from '../god/god.component';
import { AdminComponent } from '../admin/admin.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { StudentComponent } from '../student/student.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [MatCardModule, GodComponent,AdminComponent,TeacherComponent,
    StudentComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName: string = '';
  userSurname: string = '';
  userRole: number | null = null;
  page = 4;
  page1 = 5;

  constructor() {}

  ngOnInit() {
      let input_group_focus = document.getElementsByClassName('form-control');
      let input_group = document.getElementsByClassName('input-group');
      for (let i = 0; i < input_group.length; i++) {
          input_group[i].children[0].addEventListener('focus', function (){
              input_group[i].classList.add('input-group-focus');
          });
          input_group[i].children[0].addEventListener('blur', function (){
              input_group[i].classList.remove('input-group-focus');
          });
      }


      const user = localStorage.getItem('user');
      if (user) {
          const userData = JSON.parse(user);
          this.userName = userData.nombre; // Ajusta según el campo del nombre
          this.userSurname = userData.apellidos;
          this.userRole = userData.tipo_id; // Ajustar al campo correcto
      } else {
          this.userName = 'Usuario Invitado'; // Fallback si no hay usuario
      }
  }
}
