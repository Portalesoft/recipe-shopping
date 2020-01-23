import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {

    id: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router) { }

    ngOnInit() {
        this.initForm();
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params.id;
                    this.editMode = params.id !== undefined;
                    this.initForm();
                }
            );
    }

    // Getter function required for Angular, deviating from course
    get ingredientsControls() {
        return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    onAddIngredient() {

        // Ensure that the new group is pushed onto the array and not array.controls from above
        // This was a bug in the project which took a while to fix, annoying! :)
        const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;
        ingredientsFormArray.push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/[1-9]+[0-9]*$/)
                ])
            })
        );

    }

    onDeleteIngredient(index: number) {

        // Same as above remove from the form array and not the array.controls!
        const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;
        ingredientsFormArray.removeAt(index);

    }

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onSubmit() {

        if (this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }
        this.onCancel();

    }

    private initForm() {

        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        const recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            if (recipe) {
                recipeName = recipe.name;
                recipeImagePath = recipe.imagePath;
                recipeDescription = recipe.description;
                if (recipe.ingredients) {
                    for (const ingredient of recipe.ingredients) {
                        recipeIngredients.push(
                            new FormGroup({
                                name: new FormControl(ingredient.name, Validators.required),
                                amount: new FormControl(ingredient.amount, [
                                    Validators.required,
                                    Validators.pattern(/[1-9]+[0-9]*$/)
                                ])
                            })
                        );
                    }
                }
            }
        }

        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ingredients: recipeIngredients
        });

    }

}
