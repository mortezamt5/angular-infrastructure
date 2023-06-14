import { AppFormDirective } from './app-form.directive';
import { NgForm, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonDirective } from './app-button.directive';
import { AppTextBoxDirective } from './app-text-box.directive';

const ALL_DIRECTIVES = [
  AppFormDirective,
  AppTextBoxDirective,
  AppButtonDirective,
];
@NgModule({
  declarations: [...ALL_DIRECTIVES],
  imports: [CommonModule, FormsModule],
  exports: [...ALL_DIRECTIVES],
  providers: [{ provide: NgForm, useValue: true }],
})
export class AppDirectiveModule {}
