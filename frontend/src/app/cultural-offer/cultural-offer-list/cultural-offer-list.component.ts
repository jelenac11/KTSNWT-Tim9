import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CulturalOfferPage } from 'src/app/core/models/response/cultural-offer-page.model';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-cultural-offer-list',
  templateUrl: './cultural-offer-list.component.html',
  styleUrls: ['./cultural-offer-list.component.scss']
})
export class CulturalOfferListComponent implements OnInit {
  
  role: string = '';

  page: number = 1;

  size: number = 10;

  rows: [CulturalOffer[]] = [[]];

  culturalOffers: CulturalOfferPage = { content: [], totalElements: 0 };

  constructor(
    private culturalOfferService: CulturalOfferService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.getCulturalOffers();
    this.role = this.jwtService.getRole();
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.getCulturalOffers();
  }

  getCulturalOffers(): void {
    this.culturalOfferService.getAll(this.size, this.page - 1).subscribe(culturalOffers => {
      this.culturalOffers = culturalOffers;
      this.separateData();
    });
  }

  separateData(): void {
    this.rows = [[]];
    for (let i = 0; i < this.culturalOffers.content.length / 5; i++) {
      this.rows.push([]);
      for (let j = 0; j < 5; j++) {
        if (!this.culturalOffers.content[5 * i + j]) {
          continue;
        }
        this.rows[i].push(this.culturalOffers.content[5 * i + j]);
      }
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Delete this cultural offer?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.culturalOfferService.delete(id).subscribe(succ => {
      if (succ) {
        this.getCulturalOffers();
        this.snackBar.success("You have successfully deleted cultural offer!");
      } else {
        this.snackBar.error("You can't delete this cultural offer or it was already deleted.");
      }
    }, err => {
      console.log(err);
      this.snackBar.error("You can't delete this cultural offer or it was already deleted.");
    });
  }
}
