import {KeyValue} from '../key-value';

export const STRING_OPERATOR_DATA_FA: KeyValue[] = [
  {key: 'EQUALS', value: 'مساوی با'},
  {key: 'NOT_EQUALS', value: 'مساوی نیست با'},
  {key: 'CONTAINS', value: 'شامل'},
  {key: 'NOT_CONTAINS', value: 'شامل نیست'},
  {key: 'START_WITH', value: 'شروع با'},
  {key: 'END_WITH', value: 'پایان با'},
  {key: 'EMPTY', value: 'خالی است'},
  {key: 'NOT_EMPTY', value: 'خالی نیست'},
];
export const STRING_OPERATOR_DATA_EN: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'NOT_EQUALS', value: 'Is not equal to'},
  {key: 'CONTAINS', value: 'Contains'},
  {key: 'NOT_CONTAINS', value: 'Does not contains'},
  {key: 'START_WITH', value: 'Starts with'},
  {key: 'END_WITH', value: 'Ends with'},
  {key: 'EMPTY', value: 'Is empty'},
  {key: 'NOT_EMPTY', value: 'Is not empty'},
];

export const NUMBER_OPERATOR_DATA_FA: KeyValue[] = [
  {key: 'EQUALS', value: 'مساوی با'},
  {key: 'NOT_EQUALS', value: 'مساوی نیست با'},
  {key: 'GTE', value: 'بزرگتر مساوی با'},
  {key: 'GT', value: 'بزرگتر از'},
  {key: 'LTE', value: 'کوچکتر مساوی با'},
  {key: 'LT', value: 'کوچکتر از'},
  {key: 'BETWEEN', value: 'بین'}
];
export const NUMBER_OPERATOR_DATA_EN: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'NOT_EQUALS', value: 'Is not equal to'},
  {key: 'GTE', value: 'Is greater than or equal to'},
  {key: 'GT', value: 'Is greater than'},
  {key: 'LTE', value: 'Is less than or equal to'},
  {key: 'LT', value: 'Is less than'},
  {key: 'BETWEEN', value: 'Between'}
];
export const DATE_OPERATOR_DATA_FA: KeyValue[] = [
  {key: 'EQUALS', value: 'مساوی با'},
  {key: 'GTE', value: 'بزرگتر مساوی با'},
  {key: 'GT', value: 'بزرگتر از'},
  {key: 'LT', value: 'کوچکتر از'},
  {key: 'BETWEEN', value: 'بین'},
  {key: 'TODAY', value: 'امروز'},
  {key: 'LAST_WEEK', value: 'هفته گذشته'},
  {key: 'LAST_MONTH', value: 'ماه گذشته'},
  {key: 'LAST_YEAR', value: 'سال گذشته'},
];
export const DATE_OPERATOR_DATA_EN: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'GT', value: 'Is greater than'},
  {key: 'LT', value: 'Is less than'},
  {key: 'BETWEEN', value: 'Between'},
  {key: 'TODAY', value: 'Today'},
  {key: 'LAST_WEEK', value: 'Last week'},
  {key: 'LAST_MONTH', value: 'Last month'},
  {key: 'LAST_YEAR', value: 'Last year'},
];
export const TIME_OPERATOR_DATA_FA: KeyValue[] = [
  {key: 'EQUALS', value: 'مساوی با'},
  {key: 'GT', value: 'بزرگتر از '},
  {key: 'LT', value: 'کوچکتر از'},
  {key: 'BETWEEN', value: 'بین'}
];
export const TIME_OPERATOR_DATA_EN: KeyValue[] = [
  {key: 'EQUALS', value: 'Is equal to'},
  {key: 'GT', value: 'Is greater than'},
  {key: 'LT', value: 'Is less than'},
  {key: 'BETWEEN', value: 'Between'}
];
