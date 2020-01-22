// It would be fine to add this functionality in the recipes service itself, as
// that's what maintains the recipes but Max split this out for ease of reference

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

// If a service has other services injected via di they must be marked as injectable
// Provided in root is an alternative to adding to the providers in the app module
@Injectable({providedIn: 'root'})
export class DataStorageService {

    // In order to inject this we have to add HttpClientModule in the app module
    // nb: Adding an accessor type e.g.: private Angular creates a local variable for the constructor parameter
    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {

        // Firebase put overwrites any existing data
        const recipes = this.recipesService.getRecipes();
        this.http
            .put('https://ng-complete-guide-b3d18.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });

    }

    // Returns an observable
    fetchRecipes() {

        // Ensure that if we have no ingredients we set the property to an empty array
        return this.http
            .get<Recipe[]>('https://ng-complete-guide-b3d18.firebaseio.com/recipes.json')
            .pipe(
                // Map here is the rxjs operator
                map(recipes => {
                    // Map here is the basic js map operator
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                // Tap allows us to execute some code on the data without altering the data that's funnelled through the observable
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                }));

    }

}
