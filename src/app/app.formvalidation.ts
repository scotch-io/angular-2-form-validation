import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-validation',
  template : `
  <div class="jumbotron">
    <h2>Form with Validations</h2>
    <form [formGroup]="complexForm" (ngSubmit)="submitForm(complexForm.value)">
      <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['firstName'].valid && complexForm.controls['firstName'].touched}">
        <label>First Name:</label>
        <input class="form-control" type="text" placeholder="John" [formControl]="complexForm.controls['firstName']">
        <div *ngIf="complexForm.controls['firstName'].hasError('required') && complexForm.controls['firstName'].touched" class="alert alert-danger">You must include a first name.</div>
      </div>
      <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['lastName'].valid && complexForm.controls['lastName'].touched}">
        <label>Last Name</label>
        <input class="form-control" type="text" placeholder="Doe" [formControl]="complexForm.controls['lastName']">
        <div *ngIf="complexForm.controls['lastName'].hasError('required') && complexForm.controls['lastName'].touched" class="alert alert-danger">You must include a last name.</div>
        <div *ngIf="complexForm.controls['lastName'].hasError('minlength') && complexForm.controls['lastName'].touched" class="alert alert-danger">Your last name must be at least 5 characters long.</div>
        <div *ngIf="complexForm.controls['lastName'].hasError('maxlength') && complexForm.controls['lastName'].touched" class="alert alert-danger">Your last name cannot exceed 10 characters.</div>
      </div>
      <div class="form-group">
        <label>Gender</label>
        <div class="alert alert-danger" *ngIf="!complexForm.controls['gender'].valid && complexForm.controls['gender'].touched">You must select a gender.</div>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="gender" value="Male" [formControl]="complexForm.controls['gender']">
          Male
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="gender" value="Female" [formControl]="complexForm.controls['gender']">
          Female
        </label>
      </div>
      <div class="form-group">
        <label>Activities</label>
      </div>
      <label class="checkbox-inline">
        <input type="checkbox" value="hiking" name="hiking" [formControl]="complexForm.controls['hiking']"> Hiking
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="swimming" name="swimming" [formControl]="complexForm.controls['swimming']"> Swimming
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="running" name="running" [formControl]="complexForm.controls['running']"> Running
      </label>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" [disabled]="!complexForm.valid">Submit</button>
      </div>
    </form>
  </div>
  `
})
export class FormValidationComponent {
  complexForm : FormGroup;

  constructor(fb: FormBuilder){
    this.complexForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'gender' : [null, Validators.required],
      'hiking' : [false],
      'running' : [false],
      'swimming' : [false]
    })
    console.log(this.complexForm);
    this.complexForm.valueChanges.subscribe( (form: any) => {
      console.log('form changed to:', form);
    }
    );
  }

  submitForm(value: any){
    console.log(value);
  }
}
