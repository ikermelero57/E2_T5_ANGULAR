import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/bd.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meeting-detail',
  standalone:true,
  imports: [],
  templateUrl: './meeting-detail.component.html',
  styleUrl: './meeting-detail.component.css'
})
export class MeetingDetailComponent implements OnInit{
  meeting: any;

  constructor(private route: ActivatedRoute,private apiService:ApiService){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la URL
    if (id) {
      this.apiService.getMeetingById(+id).subscribe((meeting) => {
        this.meeting = meeting;
        console.log(meeting);
      });
    }
  }
}
