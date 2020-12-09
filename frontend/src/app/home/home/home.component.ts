import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CulturalOffer } from 'src/app/core/models/cultural-offer.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  culturalOffers: CulturalOffer[] = [];

  categories: Category[] = [];

  currentCategory: number = 0;

  zoom: number = 2;

  latitude: number = 0;

  longitude: number = 0;

  searchValue: string = '';

  page: number = 1;

  size: number = 10;

  totalElements: number = 0;

  previousLabel: string = "Previous";

  nextLabel: string = "Next";

  constructor(private culturalOfferService: CulturalOfferService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  clickRow(row: CulturalOffer) {
    if (this.latitude == row.geolocation.lat && this.longitude == row.geolocation.lon) {
      this.latitude = row.geolocation.lat + 0.00001;
      this.longitude = row.geolocation.lon + 0.00001;
    }
    else {
      this.latitude = row.geolocation.lat;
      this.longitude = row.geolocation.lon;
    }
    this.zoom = 6 + Math.random() * 0.1;
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
      this.getCulturalOffersByCategoryAndName(this.categories[0].id, this.searchValue);
    })
  }

  getCulturalOffersByCategoryAndName(id: number, value: string) {
    if (!value) {
      this.culturalOfferService.getCulturalOffersByCategory(id, this.size, this.page - 1).subscribe(culturalOffers => {
        this.culturalOffers = culturalOffers.content;
        this.totalElements = culturalOffers.totalElements;
      });
    }
    else {
      this.culturalOfferService.findByCategoryIdAndName(id, value, this.size, this.page - 1).subscribe(culturalOffers => {
        this.culturalOffers = culturalOffers.content;
        this.totalElements = culturalOffers.totalElements;
      });
    }
  }

  changeTab($event: any) {
    this.resetRequiredParameters();
    this.currentCategory = $event.index;
    this.getCulturalOffersByCategoryAndName(this.categories[this.currentCategory].id, this.searchValue);
  }

  searchChanged(value: string) {
    this.searchValue = value;
    this.getCulturalOffersByCategoryAndName(this.categories[this.currentCategory].id, value);
    this.resetRequiredParameters();
  };

  handlePageChange($event: any) {
    this.resetRequiredParameters();
    this.page = $event;
    this.getCulturalOffersByCategoryAndName(this.categories[this.currentCategory].id, this.searchValue);
  }

  resetRequiredParameters() {
    this.page = 1;
    if (!this.latitude && !this.longitude) {
      this.latitude = this.latitude + 0.00001;
      this.longitude = this.longitude + 0.00001;
    }
    else {
      this.latitude = 0;
      this.longitude = 0;
    }
    if (this.zoom == 2) {
      this.zoom = this.zoom + 0.00001;
    }
    else {
      this.zoom = 2;
    }
  }
}
