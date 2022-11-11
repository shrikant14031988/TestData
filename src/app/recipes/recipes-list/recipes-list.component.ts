import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from './reciepe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  recipes: Recipe[];


  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }
}
