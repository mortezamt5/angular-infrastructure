import { Component, Input, OnInit } from '@angular/core';
import { KeyValue, GridColumn } from '../../../../type';
import {
  NUMBER_OPERATOR_DATA_FA,
  STRING_OPERATOR_DATA_FA,
  DATE_OPERATOR_DATA_FA,
  TIME_OPERATOR_DATA_FA,
  NUMBER_OPERATOR_DATA_EN,
  STRING_OPERATOR_DATA_EN,
  DATE_OPERATOR_DATA_EN,
  TIME_OPERATOR_DATA_EN,
} from '../../../../type';
import { GridFilter } from '../../../../type/grid-filter';
import { GridService } from '../../../../service/grid.service';

@Component({
  selector: 'app-grid-filter',
  templateUrl: './grid-filter.component.html',
  // styleUrls: ['./grid-filter.component.scss']
})
export class GridFilterComponent implements OnInit {
  @Input() intl!: string;
  @Input() column: GridColumn = {} as GridColumn;
  stringOperators: KeyValue[] = [];
  numberOperators: KeyValue[] = [];
  dateOperators: KeyValue[] = [];
  timeOperators: KeyValue[] = [];
  booleanOperators = ['True', 'False'];
  firstValue: string = '';
  secondValue: string = '';
  currentOperator: string = '';
  firstTimeValue = { hour: '00', minute: '00', second: '00' };
  secondTimeValue = { hour: '00', minute: '00', second: '00' };

  showBetweenDatePicker = false;
  showBetweenNumber = false;
  showDatePicker = true;
  showStringPicker = true;

  constructor(private GridService: GridService) {}

  ngOnInit(): void {

    this.init();
  }

  handleDateDataChange(data: any): void {
    const value = data.value;
    if (value) {
      this.showBetweenDatePicker = value === 'BETWEEN';
      this.showDatePicker = !(
        value === 'TODAY' ||
        value === 'LAST_WEEK' ||
        value === 'LAST_MONTH' ||
        value === 'LAST_YEAR'
      );
    }
  }

  handleNumberDataChange(data: any): void {
    const value = data.value;
    if (value) {
      this.showBetweenNumber = value === 'BETWEEN';
    }
  }

  handleStringDataChange(data: any): void {
    const value = data.value;
    this.showStringPicker = !(value === 'EMPTY' || value === 'NOT_EMPTY');
  }

  private init(): void {
    this.stringOperators = this.intl && this.intl === 'fa' ? STRING_OPERATOR_DATA_FA : STRING_OPERATOR_DATA_EN;
    this.numberOperators = this.intl && this.intl === 'fa' ? NUMBER_OPERATOR_DATA_FA : NUMBER_OPERATOR_DATA_EN;
    this.dateOperators = this.intl && this.intl === 'fa' ? DATE_OPERATOR_DATA_FA : DATE_OPERATOR_DATA_EN;
    this.timeOperators = this.intl && this.intl === 'fa' ? TIME_OPERATOR_DATA_FA : TIME_OPERATOR_DATA_EN;
    this.booleanOperators = this.intl && this.intl === 'fa' ? ['بلی'  , 'خیر'] :  ['True', 'False'];
    this.setDefaultOperators();
  }

  filter(): void {
    if (this.column.type === 'BOOLEAN') {
      this.currentOperator = 'EQUALS';
    }
    const filter = {} as GridFilter;
    filter.column = this.column;
    filter.operator = this.currentOperator;
    filter.values = [
      this.firstValue,
      this.secondValue,
      this.firstTimeValue,
      this.secondTimeValue,
    ];
    this.GridService.filterData.next(filter);
    this.GridService.closePanel.next(true);
  }

  clear(): void {
    this.firstValue = '';
    this.secondValue = '';
    this.firstTimeValue = { hour: '00', minute: '00', second: '00' };
    this.secondTimeValue = { hour: '00', minute: '00', second: '00' };
    this.setDefaultOperators();
    this.GridService.filterClear.next(this.column);
    this.GridService.closePanel.next(true);
  }

  setDefaultOperators(): void {
    if (!this.column.type || this.column.type === 'STRING') {
      this.currentOperator = this.stringOperators[0].key;
    }
    if (this.column.type === 'NUMBER' || this.column.type === 'MONEY') {
      this.currentOperator = this.numberOperators[0].key;
    }
    if (
      this.column.type === 'DATE' ||
      this.column.type === 'DATE_TIME' ||
      this.column.type === 'TIME'
    ) {
      this.currentOperator = this.dateOperators[0].key;
    }
    if (this.column.type === 'BOOLEAN') {
      this.firstValue = this.booleanOperators[0];
    }
  }
}
