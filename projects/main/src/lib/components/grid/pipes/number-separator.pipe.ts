import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'numberSeparator'})
export class NumberSeparatorPipe implements PipeTransform {

  constructor() {
  }

  transform(value: string): string {
    return this.localeString(value);
  }

  localeString(nStr: any): any {
    if (nStr === '') {
      return '';
    }
    let x, x1, x2, rgx, y1, y2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    if (x1.indexOf('.') !== -1) {
      y1 = x1.slice(x1.lastIndexOf('.')).replace(/\./g, '');

      y2 = x1.split('.');
      x = y2[0] + y1;
    } else {
      x = x1 + x2;
    }

    return x;
  }
}
