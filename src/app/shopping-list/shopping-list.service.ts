import { EventEmitter } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService {

    // public getIngredients = new EventEmitter<Ingredient[]>();
    startEditing = new Subject<number>();
    public getIngredients = new Subject<Ingredient[]>();
    ingrediant: Ingredient[] = [new Ingredient('apple', 5),
    new Ingredient('tomatos', 10),
    new Ingredient('mirchi', 25)
    ]

    public AddIngredients(items: Ingredient) {
        this.ingrediant.push(items);
        this.getIngredients.next(this.ingrediant);
    }

    public GetIngredients() {
        this.getIngredients.next(this.ingrediant);
        return this.ingrediant.slice();
        
    }

    public GetIngredient(value: number) {
        return this.ingrediant[value];
    }

    public UpdateIngredient(index: number, ingredient1: Ingredient) {
        this.ingrediant[index] = ingredient1;
        this.getIngredients.next(this.ingrediant.slice());
    }

    public AddIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.ingrediant.push(...ingredients);
        this.getIngredients.next(this.ingrediant.slice());
    }

    public DeleteItem(ingredient: Ingredient) {
        this.ingrediant = this.ingrediant.filter((item: Ingredient) => item !== ingredient);
        this.getIngredients.next(this.ingrediant.slice());
    }

    public DeleteItemByIndex(indexv: number) {
       this.ingrediant.splice(indexv,1);
       this.getIngredients.next(this.ingrediant.slice());
    }
}