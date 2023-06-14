import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  // styleUrls: ['./grid-toolbar.component.scss']
})
export class GridToolbarComponent {

  @Output() setRest: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  handleReset(): void {
    this.setRest.emit();
  }
}
