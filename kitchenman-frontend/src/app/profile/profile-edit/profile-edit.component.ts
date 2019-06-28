import { Component, OnInit, forwardRef } from '@angular/core';
import { User } from '../../user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass'],
})
export class ProfileEditComponent implements OnInit {

  user: User;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getById(0).subscribe({
      next: (user: User) => this.user = user,
      error: (err: any) => console.error(err),
    });

    this.userForm = new FormGroup({
      username: new FormControl(this.user.username),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email),
    });
  }

}
