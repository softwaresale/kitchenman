import { DataSource } from '@angular/cdk/table';
import { Ingredient } from 'src/app/recipe';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, from } from 'rxjs';

export default class IngredientDataSource extends DataSource<Ingredient> {

    private ingredients$: Observable<Ingredient[]>;

    constructor(ingredients: Observable<Ingredient[]>) {
        super();
        this.ingredients$ = ingredients;
    }

    connect(collectionViewer: CollectionViewer): Observable<Ingredient[] | readonly Ingredient[]> {
        return from(this.ingredients$);
    }
    disconnect(collectionViewer: CollectionViewer): void {
    }
}
