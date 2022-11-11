import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes-list/reciepe.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  selectedItem: Recipe;
  constructor(private recipeService: RecipeService, private activatedRouter: ActivatedRoute, private router: Router) { }
  id: number;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.selectedItem = this.recipeService.getRecipeById(this.id);
      console.log(`From Details: {0}`, this.selectedItem);
    });
  }

  addIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedItem.ingredient);
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRouter });
  }
  onDelete(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipe']);
  }
}
