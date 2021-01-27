import { Component, Input, OnInit } from '@angular/core';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input()
  showInfoWindow!: boolean;
  @Input()
  latitude = 0;
  @Input()
  longitude = 0;
  @Input()
  zoom = 1;
  @Input()
  data: CulturalOffer[] = [];
  @Input()
  markerZoom = 6;

  constructor() { }

  ngOnInit(): void {
  }

  setLocation(culturalOffer: CulturalOffer): void {
    if (this.latitude === culturalOffer.geolocation.lat && this.longitude === culturalOffer.geolocation.lon) {
      this.latitude = culturalOffer.geolocation.lat + 0.00001;
      this.longitude = culturalOffer.geolocation.lon + 0.00001;
    }
    else {
      this.latitude = culturalOffer.geolocation.lat;
      this.longitude = culturalOffer.geolocation.lon;
    }
    this.zoom = this.markerZoom + Math.random() * 0.1;
  }

}
