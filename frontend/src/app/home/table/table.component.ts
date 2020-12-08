import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CulturalOffer } from 'src/app/core/models/cultural-offer.model';
import { ClickedRow } from '../models/ClickedRow';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  culturalOffers: CulturalOffer[] = [];

  @Input()
  pathForIndividualCOffer: string = '';

  @Output()
  clickRow: EventEmitter<ClickedRow> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickedRow(row: CulturalOffer) {
    this.clickRow.emit({
      longitude: row.geolocation.lon,
      latitude: row.geolocation.lat
    });
  }
}
