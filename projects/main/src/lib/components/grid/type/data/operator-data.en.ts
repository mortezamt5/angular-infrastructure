import {KeyValue} from '../key-value';

export const STRING_OPERATOR_DATA: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'NOT_EQUALS', value: 'Is not equal to'},
  {key: 'CONTAINS', value: 'Contains'},
  {key: 'NOT_CONTAINS', value: 'Does not contains'},
  {key: 'START_WITH', value: 'Starts with'},
  {key: 'END_WITH', value: 'Ends with'},
  {key: 'EMPTY', value: 'Is empty'},
  {key: 'NOT_EMPTY', value: 'Is not empty'},
];

export const NUMBER_OPERATOR_DATA: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'NOT_EQUALS', value: 'Is not equal to'},
  {key: 'GTE', value: 'Is greater than or equal to'},
  {key: 'GT', value: 'Is greater than'},
  {key: 'LTE', value: 'Is less than or equal to'},
  {key: 'LT', value: 'Is less than'},
  {key: 'BETWEEN', value: 'Between'}
];
export const DATE_OPERATOR_DATA: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'GT', value: 'Is greater than'},
  {key: 'LT', value: 'Is less than'},
  {key: 'BETWEEN', value: 'Between'},
  {key: 'TODAY', value: 'Today'},
  {key: 'LAST_WEEK', value: 'Last week'},
  {key: 'LAST_MONTH', value: 'Last month'},
  {key: 'LAST_YEAR', value: 'Last year'},
];
export const TIME_OPERATOR_DATA: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'GT', value: 'Is greater than'},
  {key: 'LT', value: 'Is less than'},
  {key: 'BETWEEN', value: 'Between'}
];
