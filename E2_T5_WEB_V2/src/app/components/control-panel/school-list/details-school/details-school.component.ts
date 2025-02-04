import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/bd.service';
import { School } from '../../../../interface/school';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-details-school',
  imports: [GoogleMapsModule,CommonModule],
  templateUrl: './details-school.component.html',
  styleUrl: './details-school.component.css'
})
export class DetailsSchoolComponent implements OnInit{
  ikastetxe: School | undefined;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la URL
    if (id) {
      this.loadSchoolDetails(+id);
    }
  }

  loadSchoolDetails(id: number): void {
    this.apiService.getSchools().subscribe({
      next: (data) => {
        this.ikastetxe = data.find((school) => school.CCEN === id);
        if (this.ikastetxe) {
          this.initializeMap();
        }
      },
      error: (err) => {
        console.error('Error al cargar los detalles del ikastetxe:', err);
      }
    });
  }

  initializeMap(): void {
    // Configura el mapa
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor del mapa
      accessToken: 'pk.eyJ1IjoiaXR6aS1hciIsImEiOiJjbTR0cnJvbmgwOG1xMmpyOXphYnk2YXA3In0.nvbObADvRjZvchA9t_gJog', // Tu token de Mapbox
      style: 'mapbox://styles/mapbox/streets-v12', // Estilo del mapa
      center: [this.ikastetxe!.LONGITUD, this.ikastetxe!.LATITUD], // Centro del mapa (longitud, latitud)
      zoom: 15 // Nivel de zoom
    });

    // Agrega un marcador en la ubicación del ikastetxe
    this.marker = new mapboxgl.Marker({ color: '#FF0000' }) // Color del marcador
      .setLngLat([this.ikastetxe!.LONGITUD, this.ikastetxe!.LATITUD]) // Posición del marcador
      .setPopup(new mapboxgl.Popup().setHTML(`<strong>${this.ikastetxe!.NOM}</strong><br>${this.ikastetxe!.DOMI}`)) // Popup con información
      .addTo(this.map);
  }
}
