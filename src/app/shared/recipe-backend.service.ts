import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes-list/reciepe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeBackendService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const data = this.recipeService.getRecipes();
    this.httpClient.put('https://ng-recipe-database-6df95-default-rtdb.firebaseio.com/recipes.json', data).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-database-6df95-default-rtdb.firebaseio.com/recipes.json',
    ).pipe(map(response => {
        return response.map(recipe => {
        return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] }
      });
    }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
