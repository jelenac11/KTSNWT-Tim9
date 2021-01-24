import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/services/category.service';
import { MyErrorStateMatcher } from 'src/app/core/error-matchers/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { Category } from 'src/app/core/models/response/category.model';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  form: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  category: Category = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private snackBar: Snackbar,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.category = this.data;
      this.form = this.fb.group({
        name: [this.category.name, Validators.required],
        description: [this.category.description, Validators.required]
      });
    }
    else{
      this.category = null;
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  }

  get f(): { [key: string]: AbstractControl; } { return this.form.controls; }

  submit(): void {
    if (this.category) {
      this.update();
    }
    else {
      this.add();
    }
  }

  add(): void {
    if (this.form.invalid) {
      return;
    }
    const category: Category = {id: null, name: '', description: ''};
    category.name = this.form.value.name;
    category.description = this.form.value.description;
    this.categoryService.post(category).subscribe(data => {
      this.snackBar.success('Category added successfully');
      this.dialogRef.close(true);
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error('Category already exist!');
      }
    });
  }

  update(): void {
    if (this.form.invalid) {
      return;
    }
    const category: Category = {id: this.category.id, name: '', description: ''};
    category.name = this.form.value.name;
    category.description = this.form.value.description;
    this.categoryService.put(this.category.id, category).subscribe(data => {
      this.snackBar.success('Category updated successfully');
      this.dialogRef.close(true);
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error('Category already exists');
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
