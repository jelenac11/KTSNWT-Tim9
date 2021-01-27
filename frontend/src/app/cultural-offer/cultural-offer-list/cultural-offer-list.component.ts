import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/response/category.model';
import { CulturalOfferPage } from 'src/app/core/models/response/cultural-offer-page.model';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-cultural-offer-list',
  templateUrl: './cultural-offer-list.component.html',
  styleUrls: ['./cultural-offer-list.component.scss']
})
export class CulturalOfferListComponent implements OnInit {

  private currentCategory = 0;

  role = '';

  page = 1;

  size = 10;

  rows: [CulturalOffer[]] = [[]];

  culturalOffers: CulturalOfferPage = { content: [], totalElements: 0 };

  categories: Category[] = [];

  selectField: FormControl;

  searchValue = '';

  userID: number;

  subscribed = new Map<number, boolean>();


  constructor(
    private culturalOfferService: CulturalOfferService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private jwtService: JwtService,
    private categoryService: CategoryService,
    private newsService: NewsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.selectField = new FormControl();
    this.role = this.jwtService.getRole();
    if (this.role === 'ROLE_REGISTERED_USER') {
      this.userService.getCurrentUser().subscribe(user => {
        this.userID = user.id;
      });
    }
    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories.sort((a, b) => a.id - b.id);
      this.getCulturalOffersByCategoryAndName();
    });
  }

  private getCulturalOffersByCategoryAndName(): void {
    if (!this.searchValue && this.currentCategory) {
      this.culturalOfferService.getCulturalOffersByCategory(this.currentCategory.toString(), this.size, this.page - 1)
        .subscribe(culturalOffers => {
          this.culturalOffers = culturalOffers;
          this.separateData();
        });
      return;
    }
    if (!this.currentCategory && this.searchValue) {
      this.culturalOfferService.findByName(this.searchValue, this.size, this.page - 1)
        .subscribe(culturalOffers => {
          this.culturalOffers = culturalOffers;
          this.separateData();
        });
      return;
    }
    if (this.currentCategory && this.searchValue) {
      this.culturalOfferService.findByCategoryIdAndName(this.currentCategory.toString(), this.searchValue, this.size, this.page - 1)
        .subscribe(culturalOffers => {
          this.culturalOffers = culturalOffers;
          this.separateData();
        });
      return;
    }
    if (!this.currentCategory && !this.searchValue) {
      this.getCulturalOffers();
      return;
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getCulturalOffersByCategoryAndName();
  }

  private getCulturalOffers(): void {
    this.culturalOfferService.getAll(this.size, this.page - 1).subscribe(culturalOffers => {
      this.culturalOffers = culturalOffers;
      this.separateData();
    });
  }

  private separateData(): void {
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
    this.getSubscribed();
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

  private delete(id: number): void {
    this.culturalOfferService.delete(id.toString()).subscribe(succ => {
      if (succ) {
        this.getCulturalOffers();
        this.snackBar.success('You have successfully deleted cultural offer!');
      } else {
        this.snackBar.error('You can not delete this cultural offer or it was already deleted.');
      }
    }, err => {
      console.log(err);
      this.snackBar.error('You can not delete this cultural offer or it was already deleted.');
    });
  }

  searchChanged(value: string): void {
    this.searchValue = value;
    this.resetRequiredParameters();
    this.getCulturalOffersByCategoryAndName();
  }

  private resetRequiredParameters(): void {
    this.page = 1;
  }

  changeSelect(value: number): void {
    this.currentCategory = value;
    this.resetRequiredParameters();
    this.getCulturalOffersByCategoryAndName();
  }

  getSubscribed(): void {
    if (this.role === 'ROLE_REGISTERED_USER') {
      const email = this.jwtService.getEmail();
      for (const co of this.culturalOffers.content) {
        this.userService.isSubscribed(email, co.id).subscribe(res => {
          this.subscribed.set(co.id, res);
        });
      }
    }
  }

  subscribe(COID): void {
    this.newsService.subscribe(this.userID + '', COID)
      .subscribe(succ => {
        if (succ) {
          this.subscribed.set(COID, true);
        }
      });
  }

  unsubscribe(COID): void {
    this.newsService.unsubscribe(this.userID + '', COID)
      .subscribe(succ => {
        if (succ) {
          this.subscribed.set(COID, false);
        }
      });
  }
}
