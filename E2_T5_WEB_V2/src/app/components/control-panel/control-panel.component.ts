import { Component } from '@angular/core';
import { ApiService } from '../../services/bd.service';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-control-panel',
  standalone:true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  usersCount: { [key: number]: number } = {};
  todayMeetingsCount: number = 0;
  firstFourUsers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsersCount();
    this.loadFirstFourUsers();
    //this.loadTodayMeetingsCount();
  }

  loadFirstFourUsers() {
    this.apiService.getUsers().subscribe((users: any[]) => {
      // Obtén los primeros 4 usuarios
      this.firstFourUsers = users.slice(0, 4);
      console.log(this.firstFourUsers);
    });
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


  // loadTodayMeetingsCount() {
  //   this.apiService.getTodayMeetingsCount().subscribe(count => {
  //     this.todayMeetingsCount = count;
  //   });
  // }
}
