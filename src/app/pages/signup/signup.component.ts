import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subject, merge, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatCardModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  // *** PROPS ***
  // *************
  hide: boolean = true;
  signUpForm: FormGroup
  errorMessages: { [key: string]: string } = {};
  private destroy$ = new Subject<void>();

  // *** CONSTRUCTOR ***
  // *******************
  constructor() {
    // Form Group
    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      birthdate: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])},
      { validators: this.passwordMatchValidator }
    );
    // Error Messages
    merge(this.signUpForm.statusChanges, this.signUpForm.valueChanges)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.updateErrorMessage());
  }

  // *** ON DESTROY ***
  // ******************
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // *** METHODS ***
  // ***************
  // Hide password
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  // Password Match Validator
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { mismatch: true };
  };
  // Update Error Message
  updateErrorMessage() {
    const controls = this.signUpForm.controls;
    for (const name in controls) {
      if (controls[name].invalid && (controls[name].dirty || controls[name].touched)) {
        const errors = controls[name].errors;
        this.errorMessages[name] = '';
        if (errors) {
          for (const error in errors) {
            let fieldName
            name === 'username' ? fieldName = 'Username' : name === 'email' ? fieldName = 'Email' : name === 'birthdate' ? fieldName = 'Birthdate' : name === 'password' ? fieldName = 'Password' : fieldName = 'Confirm Password';
            switch (error) {
              case 'required':
                this.errorMessages[name] = `${fieldName} is required.`;
                break;
              case 'minlength':
                this.errorMessages[name] = `${fieldName} must be at least ${errors['minlength'].requiredLength} characters long.`;
                break;
              case 'maxlength':
                this.errorMessages[name] = `${fieldName} must be at most ${errors['maxlength'].requiredLength} characters long.`;
                break;
              case 'email':
                this.errorMessages[name] = `Invalid email format.`;
                break;
              case 'pattern':
                this.errorMessages[name] = `Invalid ${fieldName} format.`;
                break;
              case 'mismatch':
                this.errorMessages[name] = `Passwords do not match.`;
                break;
            }
          }
        }
      } else {
        this.errorMessages[name] = '';
      }
    }
  }
  // Submit Form
  onSubmit(){
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);
    } else {
      console.log('Form not valid');
    }
  }
}