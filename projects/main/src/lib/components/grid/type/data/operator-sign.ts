import {KeyValue} from '../key-value';

export const OPERATOR_SIGN: KeyValue[] = [
  {key: 'EQUALS', value: '==='},
  {key: 'NOT_EQUALS', value: '!=='},
  {key: 'CONTAINS', value: '%'},
  {key: 'NOT_CONTAINS', value: '!%'},
  {key: 'START_WITH', value: '~='},
  {key: 'END_WITH', value: '=~'},
  {key: 'EMPTY', value: '^'},
  {key: 'NOT_EMPTY', value: '!^'},
  {key: 'GTE', value: '>='},
  {key: 'GT', value: '>'},
  {key: 'LTE', value: '<='},
  {key: 'LT', value: '<'},
  {key: 'BETWEEN', value: '<>'},
  {key: 'TODAY', value: 't'},
  {key: 'LAST_WEEK', value: 'lw'},
  {key: 'LAST_MONTH', value: 'lm'},
  {key: 'LAST_YEAR', value: 'ly'}
];
