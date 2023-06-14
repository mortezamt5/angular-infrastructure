import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: 'form[appForm]',
  exportAs: 'app-form'
})
export class AppFormDirective {
  @Output() isValid: EventEmitter<NgForm> = new EventEmitter<NgForm>();

  constructor(private form: NgForm) { }

  @HostListener('submit', ['$event']) onSubmit() {
    if (this.form.status === 'VALID') {
      this.isValid.emit(this.form);
    }
  }
}
