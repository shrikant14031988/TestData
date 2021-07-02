import { Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  editMode = false;
  editedItemIndex: number;
  selectedIngredient: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;
  //  @Output() emmitIngrediant = new EventEmitter<Ingredient>();
  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit(): void {
    this.shoppingListService.startEditing.subscribe((value: number) => {
      this.editMode = true;
      this.editedItemIndex = value;
      this.selectedIngredient = this.shoppingListService.GetIngredient(this.editedItemIndex);
      this.slForm.setValue({
        name: this.selectedIngredient.name, number: this.selectedIngredient.amount
      })
    })
  }

  public addItem(form: NgForm): void {

    var values = form.value;
    const ingrediants: Ingredient = { name: values.name, amount: +values.number };
    if (this.editMode) {
      this.shoppingListService.UpdateIngredient(this.editedItemIndex, ingrediants);
      this.editMode = false;
    } else {
      this.shoppingListService.AddIngredients(ingrediants);
    }
    this.clearForm();
  }

  public clearForm(): void {
    this.slForm.reset();
    // this.slForm.controls.number.setValue('');
    // this.slForm.controls.name.setValue('');
  }

  public deleteItem(): void {
    this.clearForm();
    //  this.shoppingListService.DeleteItem(this.selectedIngredient);
    this.shoppingListService.DeleteItemByIndex(this.editedItemIndex);
  }
}
