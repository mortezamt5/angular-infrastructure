import {AfterViewChecked, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMoney]'
})
export class MoneyDirective {

  private regex: RegExp = new RegExp('^[0-9,.-]*$');

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

  @Input() myInput: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent): void {

    // const num2persian = new PersianNumber();
    const current: string = this.el.nativeElement.value;
    if (current) {
      // const str = num2persian.Num2persian(current);
      // this.renderer.setAttribute(this.el.nativeElement, 'title', str + ' ریال');
      this.el.nativeElement.value = this.formatSplitter(current);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      if (this.el.nativeElement.value === '') {
        this.renderer.removeAttribute(this.el.nativeElement, 'title');
        this.renderer.removeAttribute(this.el.nativeElement, 'data-title');
        this.renderer.removeClass(this.el.nativeElement, 'invalidPersianInput');
      }
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      this.renderer.setAttribute(this.el.nativeElement, 'title', 'تنها عدد مجاز است');
      this.renderer.addClass(this.el.nativeElement, 'invalidPersianInput');
      event.preventDefault();
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'title');
      this.renderer.removeAttribute(this.el.nativeElement, 'data-title');
      this.renderer.removeClass(this.el.nativeElement, 'invalidPersianInput');
    }
  }

  formatSplitter(amount: string): string | null {
    if (!amount) { return null; }

    let rawVal: string = amount.toString();
    rawVal = rawVal.replace(/,/g, '');

    const dividedValueList: string[] = [];
    while (rawVal.length > 0) {
      const rawValueLength = rawVal.length;
      const dividedValue = rawVal.substring(rawValueLength - 3);
      dividedValueList.push(dividedValue);
      rawVal = rawVal.substring(0, rawValueLength - 3);
    }

    let newValue = '';

    for (let i: number = dividedValueList.length; i >= 0; i--) {
      if (dividedValueList[i]) {
        newValue = newValue.concat(dividedValueList[i]);
        if (i !== 0) {
          newValue = newValue.concat(',');
        }
      }
    }
    return newValue;
  }
}
