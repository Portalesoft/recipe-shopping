import { Component } from '@angular/core';
import { fadeElementsAnimation } from '../shared/animations/fade-elements.animation';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    animations: [fadeElementsAnimation]
})

export class RecipesComponent {
    constructor() { }
}
