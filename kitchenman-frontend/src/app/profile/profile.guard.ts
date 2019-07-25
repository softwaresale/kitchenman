import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../auth/session.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectLoggedIn } from '../state/state';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  private loggedIn = false;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private store: Store<AppState>,
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
      console.log('You cannot go to profile. You are not logged in...');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
