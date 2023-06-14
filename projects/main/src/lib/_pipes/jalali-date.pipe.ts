import { Pipe, PipeTransform } from '@angular/core';
import { AppDate } from '../_utils';


@Pipe({ name: 'AppJalaliDate' })
export class AppJalaliDatePipe implements PipeTransform {
    constructor() { }

    transform(value: string): string {
        if (!value) {
            return '';
        }

        try {
            return AppDate.parseServer(value).formatJalaali('YYYY/MM/DD');
        } catch {
            return 'invalid-date';
        }
    }
}
