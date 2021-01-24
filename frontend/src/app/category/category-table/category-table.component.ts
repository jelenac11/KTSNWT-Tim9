import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryPage } from 'src/app/core/models/response/category-page.model';
import { Category } from 'src/app/core/models/response/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {
  categories: CategoryPage;
  page = 1;
  size = 10;
  searchValue = '';

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.searchCategory();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.searchCategory();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this category?',
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
    this.categoryService.delete(id).subscribe((succ: string) => {
      if (this.categories.content.length === 1){
        this.page--;
      }
      this.searchCategory();
      this.snackBar.success('You have successfully deleted category!');
    }, err => {
      this.snackBar.error('Can\'t delete this, category has cultural offer!');
    });
  }

  searchChanged(value: string): void {
    this.searchValue = value;
    this.searchCategory();
  }

  searchCategory(): void {
    this.categoryService.getAllPagesByName(this.size, this.page - 1, this.searchValue)
    .subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  addCategory(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '240px';
    dialogConfig.minWidth = '400px';
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.searchCategory();
      }
    });
  }

  updateCategory(category: Category): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '240px';
    dialogConfig.minWidth = '400px';
    dialogConfig.data = category;
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.searchCategory();
      }
    });
  }
}
