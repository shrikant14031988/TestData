import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../reciepe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  
  constructor(private recipeService: RecipeService) { }
  
   @Input() recipe: Recipe;
   @Input() index: number;
  
  ngOnInit(): void {
  }
}
