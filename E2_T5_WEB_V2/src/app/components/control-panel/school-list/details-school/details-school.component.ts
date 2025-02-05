import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/bd.service';
import { School } from '../../../../interface/school';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-details-school',
  standalone:true,
  imports: [GoogleMapsModule,CommonModule],
  templateUrl: './details-school.component.html',
  styleUrl: './details-school.component.css'
})
export class DetailsSchoolComponent implements OnInit{
  title = 'map';
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
          this.initializeMap(this.ikastetxe);
        }
      },
      error: (err) => {
        console.error('Error al cargar los detalles del ikastetxe:', err);
      }
    });
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
