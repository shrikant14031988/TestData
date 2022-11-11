import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Route, Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipesStartComponent } from '../recipes/recipes-start/recipes-start.component';
import { RecipesDetailComponent } from '../recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from '../recipes/recipes-edit/recipes-edit.component';
import { RecipeResolverService } from '../shared/recipe-resolver.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../auth/auth.guard';

const routeApps: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
       path: 'recipe',
      component: RecipesComponent,canActivate:[AuthGuard], 
       children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesEditComponent },
      { path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipesEditComponent, resolve: [RecipeResolverService] }
    ]
  },
  { path: 'auth', component: AuthComponent },
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

// test