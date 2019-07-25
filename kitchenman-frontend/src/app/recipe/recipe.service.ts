import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Recipe } from '../interfaces/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionService } from '../auth/session.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) {
    this.baseUrl = environment.apiUrl;
  }

  getAll(): Observable<Recipe[]> {
    if (this.sessionService.loggedIn) {
      return this.http.get<Recipe[]>(`${this.baseUrl}/recipe`, { headers: this.sessionService.newAuthHeader() });
    } else {
      return of(null);
    }
  }

  getById(id: string): Observable<Recipe> {
    if (this.sessionService.loggedIn) {
      return this.http.get<Recipe[]>(`${this.baseUrl}/recipe/${id}`, { headers: this.sessionService.newAuthHeader() }).pipe(
        map(recipes => recipes[0])
      );
    } else {
      return of(null);
    }
  }

  editById(id: string, updated: Recipe): Observable<boolean> {
    if (this.sessionService.loggedIn) {
      return this.http.put<Recipe>(
        `${this.baseUrl}/recipe/${id}`,
        updated,
        { headers: this.sessionService.newAuthHeader(), observe: 'response' }).pipe(
          map(response => response.ok)
        );
    } else {
      return of(false);
    }
  }
}
