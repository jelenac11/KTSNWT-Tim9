import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddCommentComponent } from 'src/app/comments/add-comment/add-comment.component';
import { MarkRequest } from 'src/app/core/models/request/mark-request.model';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { Mark } from 'src/app/core/models/response/mark.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { MarkService } from 'src/app/core/services/mark.service';

@Component({
  selector: 'app-cultural-offer-review',
  templateUrl: './cultural-offer-review.component.html',
  styleUrls: ['./cultural-offer-review.component.scss']
})
export class CulturalOfferReviewComponent implements OnInit {

  culturalOffer: CulturalOffer = { category: {}, geolocation: {} };
  
  culturalOfferId: string;

  mark: number = 0;

  isRated: boolean = false;

  zoom: number = 8;

  constructor(private route: ActivatedRoute, private culturalOfferService: CulturalOfferService, private markService: MarkService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.culturalOfferId = this.route.snapshot.paramMap.get('id');
    this.getCulturalOfferById();
  }

  private getCulturalOfferById() {
    this.culturalOfferService.get(this.culturalOfferId)
      .subscribe(culturalOffer => {
        this.culturalOffer = culturalOffer;
        this.getCurrentMark();
      });
  }

  private getCurrentMark() {
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

  onRate($event: number) {
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
}
