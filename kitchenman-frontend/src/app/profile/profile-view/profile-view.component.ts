import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.getById(0);
  }

}
