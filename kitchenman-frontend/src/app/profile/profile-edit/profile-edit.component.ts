import { Component, OnInit, forwardRef } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from 'src/app/state/state';
import { ProfileError } from 'src/app/state/profile/profile.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass'],
})
export class ProfileEditComponent implements OnInit {

  user$: Observable<User>;
  userForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.user$ = this.store.pipe(select(selectUser));

    this.user$.subscribe((user: User) => {
      this.userForm = this.fb.group({
        username: ['', [Validators.required]],
        firstName: [''],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
      });
    });
  }

}
