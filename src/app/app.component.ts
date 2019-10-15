import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLinear = false;
  secondFormGroup: FormGroup;
  personalInfo: FormGroup;
  educationAndExperience: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // personal info form
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
    // education and experience form
    const education = this.formBuilder.group({
      education: ['', [Validators.required]],
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)d{4}$',
          ),
        ],
      ],
    });
    this.educationAndExperience = this.formBuilder.group({
      education,
      totalExperience: [0, [Validators.required, Validators.min(0)]],
      relevantExperience: [0, [Validators.required, Validators.min(0)]],
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
  get education() {
    return this.educationAndExperience.get('education').get('education');
  }
  get date() {
    return this.educationAndExperience.get('education').get('date');
  }
  get totalExperience() {
    return this.educationAndExperience.get('totalExperience');
  }
  get relevantExperience() {
    return this.educationAndExperience.get('relevantExperience');
  }
  str(msg: object) {
    return JSON.stringify(msg);
  }
}
