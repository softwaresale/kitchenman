import { Component, OnInit, OnDestroy, Optional, Self, Input } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.sass']
})
export class IngredientTableComponent implements OnInit, OnDestroy {

  @Input() ingredients: Ingredient[];
  columnsToDisplay = ['name', 'qty', 'unit', 'description'];

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
