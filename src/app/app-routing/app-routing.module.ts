import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Route, Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipesStartComponent } from '../recipes/recipes-start/recipes-start.component';
import { RecipesDetailComponent } from '../recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from '../recipes/recipes-edit/recipes-edit.component';

const routeApps: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  {
    path: 'recipe', component: RecipesComponent, children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesEditComponent },
      { path: ':id', component: RecipesDetailComponent },
      { path: ':id/edit', component: RecipesEditComponent }
    ]
  },
  { path: 'shoppingList', component: ShoppingListComponent }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routeApps)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
