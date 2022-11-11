import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes-list/reciepe.model';
import { RecipeBackendService } from './recipe-backend.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private recipeBackendService: RecipeBackendService, private recipeService: RecipeService) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data = this.recipeService.getRecipes();
    if (data.length === 0) {
      return this.recipeBackendService.fetchRecipes();
    } else {
      return data;
    }

  }
}
