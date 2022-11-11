import { Component, Input, Output,EventEmitter } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls:['./alert.component.css']
})
export class AlertComponent{
  @Input() message: string;
  @Output() closeEvent= new EventEmitter<void>(); 

 public onclick(){
  this.closeEvent.emit(); 
 }
}