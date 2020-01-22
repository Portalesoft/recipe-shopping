// A resolver is some code that is run before a route is loaded to ensure that certain data the route depends on actually exists!

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

// A resolver is able to cancel navigation but how to do this is questionable!
// Anyway this resolver ensures that we have recipe data ...
@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {}

    // The resolve is added to the routes in app-routing.module, this results in
    // the recipes being fetched before the route is loaded
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // If we have no current recipes then execute the fetch
        const recipes = this.recipesService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }

    }

}