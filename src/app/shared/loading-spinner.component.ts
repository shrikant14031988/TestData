import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-loading',
    template: '<div class="lds-hourglass"></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

    ngOnInit(): void {
        console.log('onload spinner');
    }


}