import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CulturalOfferRequest } from 'src/app/core/models/request/cultural-offer-request.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import PlaceResult = google.maps.places.PlaceResult;

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

  loc: any;

  submitted = false;

  uploadedImage: any = '';

  defaultImage: string = '../assets/noimage.jpg';

  geoCoder: any;

  location: any = { geolocation: { lat: null, lon: null } };

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
    this.geoCoder = new google.maps.Geocoder;
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: null,
      category: ['', Validators.required],
      file: null,
      location: [null, Validators.required]
    });
  }

  setValues() {
    this.registerForm.patchValue({
      name: this.culturalOffer.name,
      description: this.culturalOffer.description,
      category: this.culturalOffer.category.id,
      file: null,
    })
    this.setLocationValue();
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
        placeId: this.registerForm.get('location').value.place_id,
        location: this.registerForm.get('location').value.formatted_address,
        lat: this.registerForm.get('location').value.geometry?.location.lat(),
        lon: this.registerForm.get('location').value.geometry?.location.lng()
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

  chooseFile(event: any) {
    if (event.target.files.length <= 0) {
      this.registerForm.patchValue({
        file: this.oldImage
      });
      this.uploadedImage = '';
      return;
    }
    const file = event.target.files[0];
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
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.uploadedImage = reader.result;
    }
  }

  setLocationValue() {
    this.geoCoder.geocode(
      {
        placeId: this.culturalOffer.geolocation.placeId,
      },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.location.geolocation.lat= results[0].geometry?.location.lat();
            this.location.geolocation.lon= results[0].geometry?.location.lng();
            this.registerForm.patchValue({
              location:results[0]
            })
            this.loc=results[0].formatted_address;
          }
        }
      });
  }

  onAutocompleteSelected($event: PlaceResult) {
    this.location.geolocation.lat = $event.geometry?.location.lat();
    this.location.geolocation.lon = $event.geometry?.location.lng();
  }
}
