import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'Super simple recipe!',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Our Favourite Burger',
            'Chickentastic!',
            'https://cdn.pixabay.com/photo/2014/09/03/15/05/sandwich-434658_960_720.jpg',
            [
                new Ingredient('Chicken Breast', 1),
                new Ingredient('Burger Buns', 1)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        // Return a new array which is a direct copy
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
