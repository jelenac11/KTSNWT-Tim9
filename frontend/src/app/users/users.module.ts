import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersReviewComponent } from './users-review/users-review.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonsModule, CardsModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersReviewComponent, AddAdminComponent],
  imports: [
    CommonModule,
    CardsModule,
    MatTabsModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    RouterModule,
    ButtonsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [UsersReviewComponent, AddAdminComponent]
})
export class UsersModule { }
