

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordValidator });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.password;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);

    const errors: ValidationErrors = {};
    errors['upperCaseMissing'] = false;
    errors['lowerCaseMissing'] = false;
    if (!hasLower) {
      errors['lowerCaseMissing'] = true;
    }

    if (!hasUpper) {
      errors['upperCaseMissing'] = true;
    }
    
    return (!hasLower || !hasUpper) ? errors : null;
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const url = 'http://localhost:5000/login';
    const formData = this.registrationForm.value;

    this.http.post(url, formData).subscribe(
      (response) => {
        alert("data added in the database")
      },
      (error) => {
        console.error('Error submitting data:', error);
        // 
      }

    );
  }
}
