import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
    this.user = {
      id: '9729837450928374095',
      username: 'softwaresale',
      fullName: 'Charlie Sale',
      email: 'chucks.8090@gmail.com',
    };
  }

}
