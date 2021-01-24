import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/response/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { Router } from '@angular/router';
import { google } from 'google-maps';
import { MyErrorStateMatcher } from 'src/app/core/error-matchers/ErrorStateMatcher';

declare var google: google;

@Component({
  selector: 'app-cultural-offer-form',
  templateUrl: './cultural-offer-form.component.html',
  styleUrls: ['./cultural-offer-form.component.scss']
})
export class CulturalOfferFormComponent implements OnInit {

  oldImage: File;

  categories: Category[] = [];

  culturalOffer: CulturalOffer = { geolocation: {}, category: {} };

  id: string;

  registerForm: FormGroup;

  zoom = 2;

  loc = '';

  submitted = false;

  uploadedImage: string | ArrayBuffer = '';

  markerCoordinates = { geolocation: { lat: undefined, lon: undefined } };

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private categoryService: CategoryService,
    private culturalOfferService: CulturalOfferService,
    private formBuilder: FormBuilder,
    private snackBar: Snackbar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: null,
      category: ['', Validators.required],
      file: [null, Validators.required],
      location: [null, Validators.required]
    });
    if (this.id) {
      this.getCulturalOfferById();
    }
  }

  private setValues(): void {
    this.registerForm.patchValue({
      name: this.culturalOffer.name,
      description: this.culturalOffer.description,
      category: this.culturalOffer.category.id,
      file: null,
      location: null
    });
    this.f.name.disable();
    this.setLocationValue();
    this.uploadedImage = this.culturalOffer.image;
    (fetch(this.culturalOffer.image)
      .then(res => res.arrayBuffer())
      .then((buf) => {
        const newFile = new File([buf], this.culturalOffer.name + '.jpg', { type: 'image/jpeg' });
        this.registerForm.patchValue({
          file: newFile
        });
        this.oldImage = newFile;
      })
    );
  }

  private getAllCategories(): void {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  private getCulturalOfferById(): void {
    this.culturalOfferService.get(this.id)
      .subscribe(culturalOffer => {
        this.culturalOffer = culturalOffer;
        this.setValues();
      });
  }

  get f(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.culturalOffer.name = this.registerForm.get('name').value;
    this.culturalOffer.category = this.registerForm.get('category').value;
    this.culturalOffer.description = this.registerForm.get('description').value;
    this.culturalOffer.geolocation = {
      placeId: this.registerForm.get('location').value.place_id,
      location: this.registerForm.get('location').value.formatted_address,
      lat: this.registerForm.get('location').value.geometry?.location.lat(),
      lon: this.registerForm.get('location').value.geometry?.location.lng()
    };
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(this.culturalOffer)], {
      type: 'application/json'
    });

    formData.append('culturalOfferDTO', blob);
    formData.append('file', this.registerForm.get('file').value);

    if (this.id) {
      this.update(formData);
    }
    else {
      this.create(formData);
    }
  }

  private update(formData: FormData): void {
    this.culturalOfferService.put(this.id, formData).subscribe(res => {
      if (res) {
        this.succesMessage('You have successfully updated cultural offer!');
        this.goBack(Number(this.id));
      }
      else {
        this.errorMessage('Location need to be unique. Choose another location.');
      }
    }, err => {
      console.log(err);
      this.errorMessage('Location need to be unique. Choose another location.');
    });
  }

  private create(formData: FormData): void {
    this.culturalOfferService.post(formData).subscribe(res => {
      if (res) {
        this.succesMessage('You have successfully created cultural offer!');
        this.goBack(res.id);
      }
      else {
        this.errorMessage('Location needs to be unique. Choose another location.');
      }
    }, err => {
      console.log(err);
      this.errorMessage('Location needs to be unique. Choose another location.');
    });
  }


  private goBack(id: number): void {
    this.router.navigateByUrl(`/cultural-offers/${id}`);
  }

  private succesMessage(message: string): void {
    this.snackBar.success(message);
  }

  private errorMessage(message: string): void {
    this.snackBar.error(message);
  }

  chooseFile(event): void {
    if (event.target.files.length <= 0) {
      this.setValueForImagInvalidInput();
      return;
    }
    const file = event.target.files[0];
    const mimeType = file.type;

    if (mimeType.match(/image\/*/) == null) {
      this.setValueForImagInvalidInput();
      return;
    }

    this.registerForm.patchValue({
      file
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
  }

  private setValueForImagInvalidInput(): void {
    if (this.id) {
      this.registerForm.patchValue({
        file: this.oldImage
      });
      this.uploadedImage = this.culturalOffer.image;
    }
    else {
      this.registerForm.patchValue({
        file: null
      });
      this.uploadedImage = '';
    }
  }

  private setLocationValue(): void {
    const geoCoder = new google.maps.Geocoder();
    geoCoder.geocode(
      {
        placeId: this.culturalOffer.geolocation.placeId,
      },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.registerForm.patchValue({
              location: results[0]
            });
            this.loc = results[0].formatted_address;
            this.markerCoordinates.geolocation.lat = results[0].geometry.location.lat();
            this.markerCoordinates.geolocation.lon = results[0].geometry.location.lng();
          }
        }
      });
  }

  onAutocompleteSelected($event): void {
    this.markerCoordinates.geolocation.lat = $event.geometry.location.lat();
    this.markerCoordinates.geolocation.lon = $event.geometry.location.lng();
  }
}
