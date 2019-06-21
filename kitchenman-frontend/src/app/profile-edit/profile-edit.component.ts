import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass']
})
export class ProfileEditComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
  }

}
