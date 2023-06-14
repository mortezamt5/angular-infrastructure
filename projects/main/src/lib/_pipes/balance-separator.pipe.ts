import { Pipe, PipeTransform } from '@angular/core';
import { DataUtils } from '../_utils/data-utils';

@Pipe({
  name: 'balanceSeparator',
})
export class BalanceSeparatorPipe implements PipeTransform {
  constructor() {}

  transform(value: any, subsystem?: any): any {
    if (!value) {
      return;
    }
    return DataUtils.formatToBalance(value, '-');
  }
}
