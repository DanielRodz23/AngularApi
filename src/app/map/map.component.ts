// map.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  // Centro del mapa (coordenadas de latitud y longitud)
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  
  // Nivel de zoom del mapa
  zoom = 4;
}
