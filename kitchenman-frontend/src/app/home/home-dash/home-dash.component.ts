import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Action } from '../action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.css']
})
export class HomeDashComponent {

  actions: Action[] = [
    {
      title: 'Get Cooking',
      subtitle: 'Choose a plan and get cooking',
      imageUri: `${environment.assetsPrefix}/get_cooking_banner.svg`,
      route: ''
    },
    {
      title: 'Recipes',
      subtitle: 'Manage your recipes',
      imageUri: `${environment.assetsPrefix}/plan_banner.svg`,
      route: '/recipes'
    },
    {
      title: 'Lists',
      subtitle: 'Manage your shopping lists',
      imageUri: '',
      route: ''
    },
  ];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.actions;
      }

      return this.actions;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
