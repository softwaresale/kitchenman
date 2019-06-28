import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewImage(id: string): void {
  }
}
