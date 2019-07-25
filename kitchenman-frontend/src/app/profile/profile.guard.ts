import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../auth/session.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectLoggedIn } from '../state/state';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  private loggedIn = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
  ) {
    this.store.pipe(select(selectLoggedIn)).subscribe(status => this.loggedIn = status);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/home']);
      this.snackBar.open('You must be logged in to view this route', 'Close', {duration: 3000});
      return false;
    }
  }
}
