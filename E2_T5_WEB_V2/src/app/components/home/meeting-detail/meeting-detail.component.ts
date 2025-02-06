import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../services/bd.service';
import { ActivatedRoute } from '@angular/router';
import { School } from '../../../interface/school';
import * as mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { Meeting } from '../../../interface/meeting';

@Component({
  selector: 'app-meeting-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})

export class MeetingDetailComponent implements OnInit {

  title = 'mapa';
  map!: mapboxgl.Map;
  ikastetxe: School | undefined;
  meeting: Meeting | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    // Obtener la reunión
    this.apiService.getMeetingById(+id).subscribe({
      next: (meetingData) => {
        this.meeting = meetingData;
        const targetId = Number(this.meeting.id_centro);

        // Obtener escuelas
        this.apiService.getSchools().subscribe({
          next: (schoolsData) => {
            this.ikastetxe = schoolsData.find(
              (school) => school.CCEN === targetId
            );

            // Inicializar el mapa si se encuentra la escuela
            if (this.ikastetxe) {
              setTimeout(() => {
                const mapContainer = document.getElementById('map');
                if (!mapContainer) {
                  console.error('El contenedor del mapa no existe en el DOM.');
                  return;
                }

                // Crear el mapa
                this.map = new mapboxgl.Map({
                  container: 'map', // ID del contenedor
                  accessToken: 'pk.eyJ1IjoiaXR6aS1hciIsImEiOiJjbTR0cnJvbmgwOG1xMmpyOXphYnk2YXA3In0.nvbObADvRjZvchA9t_gJog',
                  style: 'mapbox://styles/mapbox/streets-v12',
                  center: [this.ikastetxe!.LONGITUD, this.ikastetxe!.LATITUD], // Usar las coordenadas de la escuela
                  zoom: 15
                });

                // Añadir marcador
                new mapboxgl.Marker({ color: '#FF0000' })
                  .setLngLat([this.ikastetxe!.LONGITUD, this.ikastetxe!.LATITUD])
                  .setPopup(new mapboxgl.Popup({ offset: 25 }) // Popup opcional
                    .setHTML(`
                      <strong>${this.ikastetxe!.NOM}</strong><br>
                      ${this.ikastetxe!.DOMI}
                    `))
                  .addTo(this.map);
              }, 0); // Retraso de 0 milisegundos
            }
          },
          error: (err) => console.error('Error al cargar escuelas:', err)
        });
      },
      error: (err) => console.error('Error al cargar la reunión:', err)
    });
  }
}
