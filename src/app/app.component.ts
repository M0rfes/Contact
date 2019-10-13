import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  personalInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const phone = this.formBuilder.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.personalInfo = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phones: this.formBuilder.array([phone]),
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  get phones() {
    return this.personalInfo.get('phones') as FormArray;
  }
  addPhone() {
    const phone = this.formBuilder.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.phones.push(phone);
  }
  removePhone(i: number) {
    if (this.phones.length === 1) {
      return;
    }
    this.phones.removeAt(i);
  }

  get fullName() {
    return this.personalInfo.get('fullName');
  }
  get email() {
    return this.personalInfo.get('email');
  }
  str(msg: object) {
    return JSON.stringify(msg);
  }
}
