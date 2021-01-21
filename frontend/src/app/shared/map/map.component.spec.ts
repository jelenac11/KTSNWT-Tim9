import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent]
    });
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setLocation with same latitude and longitude', () => {
    const data = {
      id: 5,
      name: 'Srbija',
      category: {
        id: 1,
        name: 'Kategorija 1',
        description: 'Opis'
      },
      geolocation: {
        placeId: '123',
        location: 'Srbija',
        lon: 0,
        lat: 0
      },
      description: 'Opis',
      image: 'nekiUrl',
      averageMark: 4.85
    };
    component.setLocation(data);
    expect(component.latitude).toEqual(0.00001);
    expect(component.longitude).toEqual(0.00001);
  });

  it('setLocation with differente latitude and longitude', () => {
    const data = {
      id: 5,
      name: 'Srbija',
      category: {
        id: 1,
        name: 'Kategorija 1',
        description: 'Opis'
      },
      geolocation: {
        placeId: '123',
        location: 'Srbija',
        lon: 5,
        lat: 5
      },
      description: 'Opis',
      image: 'nekiUrl',
      averageMark: 4.85
    };
    component.setLocation(data);
    expect(component.latitude).toEqual(5);
    expect(component.longitude).toEqual(5);
  });

});
