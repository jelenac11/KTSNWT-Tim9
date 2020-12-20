import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
<<<<<<< Updated upstream
=======
import { JwtService } from 'src/app/core/services/jwt.service';
import { MarkService } from 'src/app/core/services/mark.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-cultural-offer-review',
  templateUrl: './cultural-offer-review.component.html',
  styleUrls: ['./cultural-offer-review.component.scss']
})
export class CulturalOfferReviewComponent implements OnInit {

  role: string = '';

  culturalOffer: CulturalOffer = { category: {}, geolocation: {} };
  
  culturalOfferId: string;

  zoom: number = 8;

<<<<<<< Updated upstream
  constructor(private route: ActivatedRoute, private culturalOfferService: CulturalOfferService) { }
=======
  constructor(
    private route: ActivatedRoute, 
    private culturalOfferService: CulturalOfferService, 
    private markService: MarkService, 
    private dialog: MatDialog,
    private jwtService: JwtService
  ) { }
>>>>>>> Stashed changes

  ngOnInit(): void {
    this.culturalOfferId = this.route.snapshot.paramMap.get('id');
    this.getCulturalOfferById();
  }

  private getCulturalOfferById(): void {
    this.role = this.jwtService.getRole();
    this.culturalOfferService.get(this.culturalOfferId)
      .subscribe(culturalOffer => {
        this.culturalOffer = culturalOffer;
      });
  }

<<<<<<< Updated upstream
=======
  private getCurrentMark(): void {
    this.markService.get(this.culturalOffer.id).subscribe(data => {
      this.mark = data.value;
      this.isRated = true;
    }),
    error => {
      console.log(error);
      this.mark = 0;
      this.isRated = false;
    };
  }

  onRate($event: number): void {
    let newMark: MarkRequest = {value: $event, culturalOffer: this.culturalOffer.id}
    if (!this.isRated) {
      this.markService.create(newMark).subscribe(data => {
        this.mark = data.value;
        this.isRated = true;
      }),
      error => {
        console.log(error);
      };
    } else {
      this.markService.update(newMark).subscribe(data => {
        this.mark = data.value;
      }),
      error => {
        console.log(error);
      };
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = "400px";
    dialogConfig.minWidth = "400px";
    const dialogRef = this.dialog.open(AddCommentComponent, dialogConfig);
  }
>>>>>>> Stashed changes
}
