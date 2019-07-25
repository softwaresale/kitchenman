import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../auth/session.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectLoggedIn } from '../state/state';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl: string;
  private loggedIn: boolean;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private store: Store<AppState>,
  ) {
    this.apiUrl = environment.apiUrl;
    this.store.pipe(select(selectLoggedIn)).subscribe(val => this.loggedIn = val);
  }

  getUser(): Observable<User> {
    if (this.loggedIn) {
      return this.http.get<User>(`${this.apiUrl}/users/me`, { headers: this.sessionService.newAuthHeader() });
    } else {
      return of(null);
    }
  }

  updateUser(user: User): Observable<boolean> {
    if (this.loggedIn) {
      return this.http.put<User>(`${this.apiUrl}/users/me`, user, {headers: this.sessionService.newAuthHeader(), observe: 'response'}).pipe(
        map(response => response.ok)
      );
    } else {
      return of(false);
    }
  }
}
