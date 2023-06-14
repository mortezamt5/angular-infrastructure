import {Component, Input, OnInit} from '@angular/core';
import {GridColumn} from '../../type';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  // styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent{

  @Input() row: any;
  @Input() column: GridColumn = {} as GridColumn;

  constructor() {
  }
}
