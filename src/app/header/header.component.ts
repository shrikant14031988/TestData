import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { observable, Observable, Subject, Subscription } from "rxjs";
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipes-list/reciepe.model';
import { RecipeBackendService } from '../shared/recipe-backend.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})


export class HeaderComponent implements OnInit {
    isAuthenticated = false;
    authObservable: Subscription;
    constructor(private backendService: RecipeBackendService, private authService: AuthService) {
    }

    ngOnInit() {
        this.authObservable = this.authService.User.subscribe((user: any) => {
            this.isAuthenticated = !user ? false : true;
        })
    }

    @Output() loadedFeature = new EventEmitter<string>();

    public checkRecipe(value: string): void {
        this.loadedFeature.emit(value);
    }

    onSave(): void {
        this.backendService.storeRecipes();
    }
    onFetch() {
        this.backendService.fetchRecipes().subscribe();
    }
    
    logout(){
      this.authService.logout();
    }
}