import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/bd.service';
import { School } from '../../../../interface/school';

@Component({
  selector: 'app-details-school',
  imports: [],
  templateUrl: './details-school.component.html',
  styleUrl: './details-school.component.css'
})
export class DetailsSchoolComponent {
  school: School | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const schoolId = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la ruta
    if (schoolId) {
      this.apiService.getSchoolById(+schoolId).subscribe((school) => {
        this.school = school;
      });
    }
  }
}
