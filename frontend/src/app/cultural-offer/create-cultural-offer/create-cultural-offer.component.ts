import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { CulturalOfferRequest } from 'src/app/core/models/request/cultural-offer-request.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { isForOfStatement } from 'typescript';

@Component({
  selector: 'app-create-cultural-offer',
  templateUrl: './create-cultural-offer.component.html',
  styleUrls: ['./create-cultural-offer.component.scss']
})
export class CreateCulturalOfferComponent implements OnInit {

  categories: Category[] = []

  registerForm: any;

  zoom: number = 2;

  loc: String = '';

  submitted = false;

  uploadedImage: any = '';

  defaultImage: string = '../assets/noimage.jpg';


  constructor(
    private categoryService: CategoryService,
    private culturalOfferService: CulturalOfferService,
    private formBuilder: FormBuilder,
    private snackBar: Snackbar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [null],
      category: ['', Validators.required],
      file: [null, Validators.required],
      longitude: [null],
      latitude: [null],
      location: [null]
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let newCulturalOffer: CulturalOfferRequest = {
      name: this.registerForm.get('name').value,
      category: this.registerForm.get('category').value,
      description: this.registerForm.get('description').value,
      geolocation: {
        location: 'gfgfdgfdgfd',
        lat: 0,
        lon: 0
      },
      averageMark: 0,
      admin: 1
    }
    let formData = new FormData();
    let blob = new Blob([JSON.stringify(newCulturalOffer)], {
      type: 'application/json'
    });
    formData.append('culturalOfferDTO', blob);
    formData.append('file', this.registerForm.get('file').value);
    this.culturalOfferService.post(formData).subscribe(res => {
      if (res) {
        this.snackBar.success("You have successfully created cultural offer!");
        this.submitted = false;
        this.uploadedImage='';
        this.registerForm.reset();
      }
      else {
        this.snackBar.error("Location need to be unique. Choose another location.");
      }
    }, err => {
      console.log(err);
      this.snackBar.error("Location need to be unique. Choose another location.");
    });
  }

  chooseFile(files: Event) {
    const element = files.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (!fileList) {
      return
    }

    let file: File = fileList[0];
    if (!file) {
      this.registerForm.patchValue({
        file: null
      })
      this.uploadedImage = '';
      return;
    }

    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.registerForm.patchValue({
        file: null
      })
      this.uploadedImage = '';
      return;
    }
    this.registerForm.patchValue({
      file: file
    })
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.uploadedImage = reader.result;
    }
  }

}
