import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-dash',
  templateUrl: './recipes-dash.component.html',
  styleUrls: ['./recipes-dash.component.css']
})
export class RecipesDashComponent implements OnInit {

  recipes: Recipe[];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { recipe: this.recipes[0], cols: 1, rows: 1 },
          { recipe: this.recipes[1], cols: 1, rows: 1 },
        ];
      }

      return [
        { recipe: this.recipes[0], cols: 2, rows: 1 },
        { recipe: this.recipes[1], cols: 1, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.recipeService.getAll().subscribe({
      next: (recipes: Recipe[]) => { this.recipes = recipes; },
      error: (err: any) => { console.log(err); }
    });
  }
}
