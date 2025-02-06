import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/bd.service';
import { ActivatedRoute } from '@angular/router';
import { School } from '../../../interface/school';
import * as mapboxgl from 'mapbox-gl';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Meeting } from '../../../interface/meeting';

@Component({
  selector: 'app-meeting-detail',
  standalone:true,
  imports: [GoogleMapsModule,CommonModule],
  templateUrl: './meeting-detail.component.html',
  styleUrl: './meeting-detail.component.css'
})
export class MeetingDetailComponent implements OnInit{
  title = 'map';
  ikastetxe: School | undefined;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  meeting: Meeting | undefined;

    constructor(private route: ActivatedRoute,private apiService: ApiService) {}

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('ID de la reunión:', id); // Verifica si el id está siendo capturado correctamente
      if (id) {
          this.apiService.getMeetingById(+id).subscribe({
              next: (data) => {
                  console.log('Detalles de la reunión:', data); // Verifica que los datos de la reunión se reciban correctamente
                  this.apiService.getSchools().subscribe({
                      next: (data) => {
                          console.log('Lista de escuelas:', data); // Verifica que se obtienen correctamente los datos de escuelas
                          this.ikastetxe = data.find((school) => Number(school.CCEN) === Number(this.meeting?.id_centro));
                          if (this.ikastetxe) {
                              this.initializeMap(this.ikastetxe);
                          }
                      },
                      error: (err) => {
                          console.error('Error al cargar los detalles del ikastetxe:', err);
                      }
                  });
              },
              error: (err) => {
                  console.error('Error al cargar los detalles del Meeting:', err);
              }
          });
      }
  }

    initializeMap(ikastetxe: School): void {
        // Configura el mapa
        this.map = new mapboxgl.Map({
          container: 'map', // ID del contenedor del mapa
          accessToken: 'pk.eyJ1IjoiaWtlcm1lbGVybyIsImEiOiJjbTZyb290aXMwMHhiMm9xeXh6OXY0emhiIn0.A7ZIVk7LZSc6TVB2sTnT9Q', // Tu token de Mapbox
          style: 'mapbox://styles/mapbox/streets-v12', // Estilo del mapa
          center: [ikastetxe.LONGITUD,ikastetxe.LATITUD], // Centro del mapa (longitud, latitud)
          zoom: 15 // Nivel de zoom
        });

        // Agrega un marcador en la ubicación del ikastetxe
        this.marker = new mapboxgl.Marker({ color: '#FF0000' }) // Color del marcador
          .setLngLat([ikastetxe.LONGITUD, ikastetxe.LATITUD]) // Posición del marcador
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${ikastetxe.NOM}</strong><br>${ikastetxe.DOMI}`)) // Popup con información
          .addTo(this.map);
      }
}
