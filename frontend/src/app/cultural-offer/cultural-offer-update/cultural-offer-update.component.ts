import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CulturalOfferRequest } from 'src/app/core/models/request/cultural-offer-request.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-cultural-offer-update',
  templateUrl: './cultural-offer-update.component.html',
  styleUrls: ['./cultural-offer-update.component.scss']
})
export class CulturalOfferUpdateComponent implements OnInit {

  oldImage: any;

  categories: Category[] = []

  id: any;

  culturalOffer: any;

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
    private snackBar: Snackbar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCulturalOfferById();
    this.registerForm = this.formBuilder.group({
      name: { value: '', disabled: true },
      description: [null],
      category: ['', Validators.required],
      file: [null],
      longitude: [null],
      latitude: [null],
      location: [null]
    });
  }

  setValues() {
    this.registerForm.patchValue({
      name: this.culturalOffer.name,
      description: this.culturalOffer.description,
      category: this.culturalOffer.category.id,
      file: null,
      longitude: this.culturalOffer.geolocation.lon,
      latitude: this.culturalOffer.geolocation.lat,
      location: this.culturalOffer.geolocation.location
    })
    this.uploadedImage = this.culturalOffer.image;
    (fetch(this.culturalOffer.image)
      .then(function (res) { return res.arrayBuffer(); })
      .then((buf) => {
        let newFile = new File([buf], this.culturalOffer.name + ".jpg", { type: "image/jpeg" });
        this.registerForm.patchValue({
          file: newFile
        });
        this.oldImage = newFile;
      })
    );
  }


  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  getCulturalOfferById() {
    this.culturalOfferService.get(this.id)
      .subscribe(culturalOffer => {
        this.culturalOffer = culturalOffer;
        this.setValues();
      });
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
        location: this.registerForm.get('location').value,
        lat: this.registerForm.get('latitude').value,
        lon: this.registerForm.get('longitude').value
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
    this.culturalOfferService.put(this.id, formData).subscribe(res => {
      if (res) {
        this.snackBar.success("You have successfully updated cultural offer!");
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
        file: this.oldImage
      })
      this.uploadedImage = '';
      return;
    }

    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.registerForm.patchValue({
        file: this.oldImage
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
