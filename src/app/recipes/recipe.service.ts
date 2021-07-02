import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes-list/reciepe.model";

@Injectable()
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService) {
    }
    public recipeEmited = new Subject<Recipe>();
    private recipes: Recipe[] = [new Recipe('Baingan  Bharta',
        'test recipe',
        'https://previews.123rf.com/images/dinodia/dinodia1709/dinodia170906495/85741320-vegetable-small-brinjal-baingan-aubergines-eggplant-india.jpg'
        , [
            new Ingredient('baingan', 5),
            new Ingredient('lal chatani', 3)
        ]
    )
        ,
    new Recipe(
        'caret',
        'test recipe1',
        'https://media.istockphoto.com/photos/small-size-carrot-with-white-background-nature-vegetable-with-white-picture-id1200729408?k=6&m=1200729408&s=170667a&w=0&h=klyub__sLxroovul7cusE7tre1qXALtKzxmKX65_Ct8='
        , [
            new Ingredient('caret', 10),
            new Ingredient('sugar', 5)
        ])
    ];

    public getRecipes() {
        return this.recipes.slice();
    }

    public getRecipeById(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingrediant: Ingredient[]) {
        this.shoppingListService.AddIngredientsToShoppingList(ingrediant);
    }
}