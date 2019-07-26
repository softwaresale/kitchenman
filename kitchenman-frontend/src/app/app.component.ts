import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/state';
import { ProfileCheckJwt } from './state/profile/profile.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'kitchenman-frontend';

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    // Check to see if there is a jwt in storage
    const jwt = localStorage.getItem('jwt');
    this.store.dispatch(new ProfileCheckJwt(!!jwt));
  }
}
