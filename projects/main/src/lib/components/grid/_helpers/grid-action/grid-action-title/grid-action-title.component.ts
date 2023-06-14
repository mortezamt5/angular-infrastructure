import {Component, Input, OnInit} from '@angular/core';
import {GridAction} from '../../../type';

@Component({
  selector: 'app-grid-action-title',
  templateUrl: './grid-action-title.component.html',
  // styleUrls: ['./grid-action-title.component.scss']
})
export class GridActionTitleComponent{

  @Input() action!: GridAction;

  constructor() {
  }
}
