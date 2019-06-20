import { Injectable } from '@angular/core';
import { USERS } from './mock-data';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mockUsers = USERS;

  constructor() { }

  getAll(): Observable<User[]> {
    return of(this.mockUsers);
  }

  getById(id: number): Observable<User> {
    return of(this.mockUsers[id]);
  }

  editById(id: number, updated: User): Observable<User> {
    this.mockUsers[id] = updated;
    return this.getById(id);
  }
}
