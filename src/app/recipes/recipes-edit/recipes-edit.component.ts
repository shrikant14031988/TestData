import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeSerive: RecipeService, private router: Router) { }
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
  public get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls ;
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';

    // let recipeIngrediants = new FormArray([new FormGroup({
    //   'name': new FormControl(),
    //   'amount': new FormControl()
    // })]);

    let recipeIngrediants = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeSerive.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.path;
      recipeDescription = recipe.description;

      if (recipe['ingredient']) {
        for (let ingrediantItem of recipe.ingredient) {
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingrediantItem.name),
              'amount': new FormControl(ingrediantItem.amount
              )
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'path': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngrediants
    })
  }
  public submitForm() {
    const ingred= this.recipeForm.value['ingredients'];
    console.log(`From edit: {0}`, this.recipeForm.value);
    if (this.editMode) {
      this.recipeSerive.updateRecipes(this.id, this.recipeForm.value)
    } else {
      this.recipeSerive.addRecipes(this.recipeForm.value);
    }
    this.onCancel();
  }
  public addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }
 public deleteIngrediants(index:number): void{
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
 }
  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
