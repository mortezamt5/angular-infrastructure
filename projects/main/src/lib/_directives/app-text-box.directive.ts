import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[appTextBox]',
  exportAs: 'app-text-box'
})
export class AppTextBoxDirective {
  constructor() { }
  @HostBinding('class')
  elementClass = 'form-control';
}
