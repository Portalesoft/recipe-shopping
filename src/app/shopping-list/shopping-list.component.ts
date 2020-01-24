import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { fadeElementAnimation } from 'src/app/shared/animations/fade-element.animation';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    animations: [ fadeElementAnimation ]
})

export class ShoppingListComponent implements OnInit, OnDestroy {

    currentState = 'in';

    ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        this.subscription = this.shoppingListService.ingredientsChanged
            .subscribe((ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

}
