import { Component, OnInit, forwardRef } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from 'src/app/state/state';
import { ProfileError, UpdateProfile } from 'src/app/state/profile/profile.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass'],
})
export class ProfileEditComponent implements OnInit {

  user$: Observable<User>;
  user: User;
  userForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.user$ = this.store.pipe(select(selectUser));

    this.user$.subscribe(user => this.user = user);

    this.userForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const userObject = { ...formValue, id: this.user.id };
      this.store.dispatch(new UpdateProfile(userObject));
    }
  }
}
