import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, merge, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatIconModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  // *** PROPS ***
  // *************
  hide = true;
  signInForm: FormGroup;
  errorMessages: { [key: string]: string } = {};
  private destroy$ = new Subject<void>();

  // *** CONSTRUCTOR ***
  // *******************
  constructor() {
    // Form Group
    this.signInForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
    // Error Messages
    merge(this.signInForm.statusChanges, this.signInForm.valueChanges)
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
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  // Update Error Message
  updateErrorMessage() {
    const controls = this.signInForm.controls;
    for (const name in controls) {
      if (controls[name].invalid && (controls[name].dirty || controls[name].touched)) {
        const errors = controls[name].errors;
        this.errorMessages[name] = '';
        if (errors) {
          for (const error in errors) {
            switch (error) {
              case 'required':
                this.errorMessages[name] = `${name}  is required.`;
                break;
              case 'minlength':
                this.errorMessages[name] = `${name} must be at least ${errors['minlength'].requiredLength} characters long.`;
                break;
              case 'maxlength':
                this.errorMessages[name] = `${name} must be at most ${errors['maxlength'].requiredLength} characters long.`;
                break;
            }
          }
        }
      } else {
        this.errorMessages[name] = '';
      }
    }
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form Submitted', this.signInForm.value);
    } else {
      console.log('Form not valid');
    }
  }

}
