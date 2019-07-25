import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectUser } from 'src/app/state/state';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  user$: Observable<User>;
  isError$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
  }

}
