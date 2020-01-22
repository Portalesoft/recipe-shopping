// It would be fine to add this functionality in the recipes service itself, as
// that's what maintains the recipes but Max split this out for ease of reference

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

// If a service has other services injected via di they must be marked as injectable
// Provided in root is an alternative to adding to the providers in the app module
@Injectable({ providedIn: 'root' })
export class DataStorageService {

    // In order to inject this we have to add HttpClientModule in the app module
    // nb: Adding an accessor type e.g.: private Angular creates a local variable for the constructor parameter
    constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {}

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
            })
        );

        // The code below was changed once the interceptor was added, leaving this
        // here though it's instructive in the use of the exhaust map to chain pipes

        // Only take one value from the subscription and then immediately unsubscribe
        // Note the user is a behaviour subject and so always has the previous user available

        // *** We cannot return an observable from within a subscribe method ***
        // Hence we use exhaust map to pipe the user and http observables into one
        // big observable. This waits for the first observable to complete i.e.: taking the latest
        // user and then pipes the user into the http observable. The http observable then replaces
        // the user observable in the chain

        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(user => {
        //         return this.http
        //             .get<Recipe[]>('https://ng-complete-guide-b3d18.firebaseio.com/recipes.json')
        //     }),
        //     // Map here is the rxjs operator
        //     map(recipes => {
        //         // Map here is the basic js map operator
        //         return recipes.map(recipe => {
        //             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        //         });
        //     }),
        //     // Tap allows us to execute some code on the data without altering the data that's funnelled through the observable
        //     tap(recipes => {
        //         this.recipesService.setRecipes(recipes);
        //     }));

    }

}
