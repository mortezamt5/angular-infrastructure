import { Pipe, PipeTransform } from '@angular/core';
// import {TranslatorService} from '../services/translator.service';

@Pipe({
  name: 'translator',
})
export class TranslatorPipe implements PipeTransform {
  // constructor(private translatorService: TranslatorService) {
  constructor() {}

  transform(value: any, subsystem?: any): any {
    if (!value) {
      return;
    }
    // return this.translatorService.instant(value, subsystem);
  }
}
