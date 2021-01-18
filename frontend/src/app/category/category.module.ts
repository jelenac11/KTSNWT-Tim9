import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { ButtonsModule, CardsModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [CategoryTableComponent, CategoryDialogComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatButtonModule,
    SharedModule,
    ButtonsModule,
    CardsModule,
    NgxPaginationModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [CategoryTableComponent, CategoryDialogComponent]
})
export class CategoryModule { }
