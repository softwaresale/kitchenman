import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../auth/session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getUser(): Observable<User> {
    if (this.sessionService.loggedIn) {
      return this.http.get<User>(`${this.apiUrl}/users/me`, { headers: this.sessionService.newAuthHeader() });
    } else {
      return of(null);
    }
  }
}
