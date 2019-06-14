import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user = {
      username: 'softwaresale',
      fullName: 'Charlie Sale',
      email: 'softwaresale01@gmail.com'
    };
  }

}
