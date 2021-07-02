import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from './reciepe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }
  recipes: Recipe[];


  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }
}
