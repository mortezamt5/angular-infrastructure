import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatorPipe } from './translator.pipe';
import { NumberSeperatorPipe } from './number-seperator.pipe';
import { AppJalaliDatePipe } from './jalali-date.pipe';
import { BalanceSeparatorPipe } from './balance-separator.pipe';

@NgModule({
  declarations: [
    TranslatorPipe,
    NumberSeperatorPipe,
    AppJalaliDatePipe,
    BalanceSeparatorPipe,
  ],
  imports: [CommonModule],
  exports: [
    TranslatorPipe,
    NumberSeperatorPipe,
    AppJalaliDatePipe,
    BalanceSeparatorPipe,
  ],
})
export class AppPipesModule {}
