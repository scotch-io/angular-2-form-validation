import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'complex-form',
  templateUrl : './app.complexform.html'
})
export class ComplexFormComponent {
  complexForm : FormGroup;

  constructor(fb: FormBuilder){
    this.complexForm = fb.group({
      'firstName' : '',
      'lastName': '',
      'gender' : ['Female'],
      'hiking' : false,
      'running' : false,
      'swimming' : false
    })
  }

  submitForm(value: any){
    console.log('Reactive Form Data: ')
    console.log(value);
  }
}
