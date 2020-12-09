import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CulturalOffer } from 'src/app/core/models/cultural-offer.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';

@Component({
  selector: 'app-cultural-offer-review',
  templateUrl: './cultural-offer-review.component.html',
  styleUrls: ['./cultural-offer-review.component.scss']
})
export class CulturalOfferReviewComponent implements OnInit {

  culturalOffer: CulturalOffer = {
    id: 0,
    name: '',
    category: {
      id: 0,
      name: ''
    },
    geolocation: {
      location: '',
      lat: 0,
      lon: 0
    },
    description: '',
    image: '',
    averageMark: 0
  };
  culturalOfferId: string | null = null;

  zoom: number = 8;

  constructor(private route: ActivatedRoute, private culturalOfferService: CulturalOfferService) { }

  ngOnInit(): void {
    this.culturalOfferId = this.route.snapshot.paramMap.get('id');
    this.getCulturalOfferById();
  }

  getCulturalOfferById() {
    this.culturalOfferService.get(this.culturalOfferId)
      .subscribe(culturalOffer => {
        this.culturalOffer = culturalOffer;
      });
  }

}
