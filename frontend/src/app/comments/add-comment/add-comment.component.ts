import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommentRequest } from 'src/app/core/models/request/comment-request.model';
import { CommentService } from 'src/app/core/services/comment.service';
import { MyErrorStateMatcher } from 'src/app/shared/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  form: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  uploadedImage: string | ArrayBuffer = '';
  culturalOfferId: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCommentComponent>,
    private snackBar: Snackbar,
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.culturalOfferId = +this.router.url.split('/')[2];
    this.form = this.fb.group({
      text: [''],
      file: [null],
      fileName: [''],
    }, {validators: [CustomValidators.commentValidator] });
  }

  get f() { return this.form.controls; }

  chooseFile(event: any) {
    if (event.target.files.length <= 0) {
      this.setValueForImageInvalidInput();
      return;
    }
    
    const file = event.target.files[0];
    const mimeType = file.type;
   
    if (mimeType.match(/image\/*/) == null) {
      this.setValueForImageInvalidInput();
      return;
    }
   
    this.form.patchValue({
      file: file
    });
   
    this.form.patchValue({
      fileName: file.name
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.uploadedImage = reader.result;
    }
  }

  setValueForImageInvalidInput() {
    this.form.patchValue({
      file: null
    });
    this.uploadedImage = '';
  }

  add(): void {
    if (this.form.invalid) {
      return;
    }
    let comment: CommentRequest = { culturalOffer: this.culturalOfferId, text: ''};
    comment.text = this.form.value['text'];
    let formData = new FormData();
    let blob = new Blob([JSON.stringify(comment)], {
      type: 'application/json'
    });

    formData.append('commentDTO', blob);
    formData.append('file', this.form.get('file').value);
    this.commentService.post(formData).subscribe(res => {
      this.snackBar.success("Your comment is sent to administrator for approval")
      this.close();
    },
    error => {
      this.snackBar.error(error.error);
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
