import {Component, Input, OnInit} from '@angular/core';
import {GridColumn} from '../../type';

@Component({
  selector: 'app-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  // styleUrls: ['./grid-header-cell.component.scss'],
})
export class GridHeaderCellComponent {

  constructor() {
  }

  @Input() intl!: string
  @Input() column: GridColumn = {} as GridColumn;
}
