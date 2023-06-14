import {GridColumn} from './grid-column';

export interface GridFilter {
  column: GridColumn;
  operator: string; // 'EQUALS' | 'IN' | 'BETWEEN' | 'LIKE' | 'LESS_THAN_OR_EQUAL_TO' | 'LESS_THAN' |
  // 'LARGER_THAN_OR_EQUAL_TO' | 'LARGER_THAN';
  values: any;
}
