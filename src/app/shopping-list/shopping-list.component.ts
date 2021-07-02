import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipes-list/reciepe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ingrediant: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingrediant = this.shoppingListService.GetIngredients();
    this.subscription = this.shoppingListService.getIngredients.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingrediant = ingredients;
      }
    );
  }
  editItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
