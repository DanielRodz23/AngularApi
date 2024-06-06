// map.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 27.849649, lng: -101.119781 };
  zoom = 8;
  airQualityInfo: string = ''; // Variable para almacenar la información de calidad del aire

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log('Latitud:', lat, 'Longitud:', lng);
      this.getAirQuality(lat, lng);
    }
  }

  async  getAirQuality(lat: number, lng: number): Promise<void> {
    const apiKey = 'AIzaSyCNFUd2OSXwCZztX-rtcCyVwW94_bzV7bY';
    const url = `https://airquality.googleapis.com/v1/history:lookup?key=${apiKey}`;

    const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() - 5);

  const dateTimeString = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')}T${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}Z`;

    const postData = {
      dateTime: dateTimeString,
      location: {
        latitude: lat,
        longitude: lng
      }
    };

     var jsontext:string = JSON.stringify(postData);

    try {
      const response:any = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsontext
      });
      const data = await response.json();
      console.log('Calidad del aire:', data);
      const airQuality = data.hoursInfo[0].indexes[0];
      this.airQualityInfo = `AQI: ${airQuality.aqi}, Calidad: ${airQuality.category}, Contaminante dominante: ${airQuality.dominantPollutant}`;
    } catch (error) {
      console.error('Error al obtener la calidad del aire:', error);
      this.airQualityInfo = 'Error al obtener la calidad del aire';
    }
  }
}
