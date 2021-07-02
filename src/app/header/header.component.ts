import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    @Output() loadedFeature = new EventEmitter<string>();
   
    public checkRecipe(value: string): void {
        this.loadedFeature.emit(value);
        
    }
}