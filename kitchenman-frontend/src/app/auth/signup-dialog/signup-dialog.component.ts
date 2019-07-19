import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.sass']
})
export class SignupDialogComponent implements OnInit {

  newUserForm: FormGroup;
  get usernameControl(): FormControl {
    if (this.newUserForm) {
      return this.newUserForm.get('username') as FormControl;
    } else {
      return null;
    }
  }
  get passwordControl(): FormControl {
    if (this.newUserForm) {
      return this.newUserForm.get('password') as FormControl;
    } else {
      return null;
    }
  }
  get firstNameControl(): FormControl {
    if (this.newUserForm) {
      return this.newUserForm.get('firstName') as FormControl;
    } else {
      return null;
    }
  }
  get lastNameControl(): FormControl {
    if (this.newUserForm) {
      return this.newUserForm.get('lastName') as FormControl;
    } else {
      return null;
    }
  }
  get emailControl(): FormControl {
    if (this.newUserForm) {
      return this.newUserForm.get('email') as FormControl;
    } else {
      return null;
    }
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignupDialogComponent>,
  ) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.newUserForm.valid) {
      this.dialogRef.close(this.newUserForm.value);
    } else {
      console.log('Invalid form');
    }
  }
}
