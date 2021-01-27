import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddCommentComponent } from 'src/app/comments/add-comment/add-comment.component';
import { MarkRequest } from 'src/app/core/models/request/mark-request.model';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MarkService } from 'src/app/core/services/mark.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cultural-offer-review',
  templateUrl: './cultural-offer-review.component.html',
  styleUrls: ['./cultural-offer-review.component.scss']
})
export class CulturalOfferReviewComponent implements OnInit {

  role = '';

  culturalOffer: CulturalOffer = { category: {}, geolocation: {} };

  culturalOfferId;

  mark = 0;

  isRated = false;

  zoom = 8;

  subscribed = false;

  userID;

  constructor(
    private route: ActivatedRoute,
    private culturalOfferService: CulturalOfferService,
    private registeredUserService: UserService,
    private newsService: NewsService,
    private markService: MarkService,
    private dialog: MatDialog,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.culturalOfferId = this.route.snapshot.paramMap.get('id');
    this.role = this.jwtService.getRole();
    if (this.role === 'ROLE_REGISTERED_USER') {
      this.userService.getCurrentUser().subscribe(user => {
        this.userID = user.id;
      });
    }
    this.getCulturalOfferById();
  }

  private getCulturalOfferById(): void {
    this.culturalOfferService.get(this.culturalOfferId)
      .subscribe(culturalOffer => {
        this.culturalOffer = culturalOffer;
        this.getCurrentMark();
      });
    if (this.role === 'ROLE_REGISTERED_USER') {
      this.registeredUserService.isSubscribed(this.jwtService.getEmail(), this.culturalOfferId)
        .subscribe(sub => {
          this.subscribed = sub;
        });
    }
  }

  private getCurrentMark(): void {
    if (this.jwtService.getRole() === 'ROLE_REGISTERED_USER') {
      this.markService.get(this.culturalOffer.id).subscribe(data => {
        this.mark = data.value;
        this.isRated = true;
      },
        error => {
          this.mark = 0;
          this.isRated = false;
        });
    }
  }

  onRate($event: number): void {
    const newMark: MarkRequest = { value: $event, culturalOffer: this.culturalOffer.id };
    if (!this.isRated) {
      this.markService.create(newMark).subscribe(data => {
        this.mark = data.value;
        this.isRated = true;
        this.culturalOfferService.get(this.culturalOfferId)
          .subscribe(culturalOffer => {
            this.culturalOffer = culturalOffer;
            this.getCurrentMark();
          });
      },
        error => {
          console.log(error);
        });
    } else {
      this.markService.update(newMark).subscribe(data => {
        this.mark = data.value;
        this.culturalOfferService.get(this.culturalOfferId)
          .subscribe(culturalOffer => {
            this.culturalOffer = culturalOffer;
            this.getCurrentMark();
          });
      },
        error => {
          console.log(error);
        });
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '400px';
    dialogConfig.minWidth = '400px';
    const dialogRef = this.dialog.open(AddCommentComponent, dialogConfig);
  }

  subscribe(): void {
    this.newsService.subscribe(this.userID, this.culturalOfferId)
      .subscribe(succ => {
        if (succ) {
          this.subscribed = true;
        }
      });
  }

  unsubscribe(): void {
    this.newsService.unsubscribe(this.userID, this.culturalOfferId)
      .subscribe(succ => {
        if (succ) {
          this.subscribed = false;
        }
      });
  }

}
