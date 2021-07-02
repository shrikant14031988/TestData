import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeSerive: RecipeService) { }
  id: number;
  editMode = false;


  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      console.log(this.editMode);
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngrediants = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeSerive.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.path;
      recipeDescription = recipe.description;
      if (recipe['ingrediant']) {
        for (let ingrediantItem of recipe.ingrediant) {
          recipeIngrediants.push(new FormGroup({
            'name': new FormControl(ingrediantItem.name),
            'amount': new FormControl(ingrediantItem.amount)
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngrediants
    })
  }
  public submitForm() {
    console.log(this.recipeForm.value);
  }
  public addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }
}
