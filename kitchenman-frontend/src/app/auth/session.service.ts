import { User } from './../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * Handles a user's session info. It manages login, logout, and credentials
 *
 * @export
 * @class SessionService
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private jwt: string;
  private baseUrl: string;

  get loggedIn(): boolean {
    if (this.jwt) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.apiUrl;
    console.log('Local baseurl');
    console.log(this.baseUrl);
  }

  signUp(user: User): Observable<boolean> {
    return this.http.post<string>(`${this.baseUrl}/auth/signup`, user, {observe: 'response'}).pipe(
      switchMap((value: HttpResponse<string>, index: number) => {
        if (value.ok) {
          this.jwt = value.body;
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  /**
   * Authenticates a user with given credentials
   *
   * @param user username of user
   * @param pass password of user
   * @returns observable of login state. True if successful, false otherwise
   * @memberof SessionService
   */
  login(user: string, pass: string): Observable<boolean> {
    const headers: HttpHeaders = this.createAuthHeader(user, pass);
    // Send a login request. If the response is authenticated, store the jwt and pass on true
    return this.http.post<string>(`${this.baseUrl}/auth/login`, null, { headers, observe: 'response' }).pipe(
      switchMap((value: HttpResponse<string>, idx: number) => {
        if (value.ok) {
          this.jwt = value.body;
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  logout(): void {
    this.jwt = null;
  }

  get authHeader(): string {
    if (this.jwt) {
      return `Authorization: Bearer ${this.jwt}`;
    } else {
      return null;
    }
  }

  newAuthHeader(): HttpHeaders {
    if (this.jwt) {
      return new HttpHeaders(this.authHeader);
    } else {
      return null;
    }
  }

  appendAuthHeader(headers: HttpHeaders): void {
    if (this.jwt) {
      headers.append('Authorization', `Bearer ${this.jwt}`);
    }
  }

  private createAuthHeader(user: string, pass: string): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
    });

    return headers;
  }
}
