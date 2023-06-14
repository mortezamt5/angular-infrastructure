import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-grid-time-picker',
  templateUrl: './grid-time-picker.component.html',
  // styleUrls: ['./grid-time-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GridTimePickerComponent),
    multi: true
  }]
})
export class GridTimePickerComponent implements ControlValueAccessor {

  @Input() title = 'Select time';

  hour = '00';
  minute = '00';
  second = '00';

  val = {hour: '00', minute: '00', second: '00'};

  set value(val: any) {  // this value is updated by programmatic changes
    if (val !== undefined && this.val !== val) {
      this.val = val;
      if (val) {
        this.hour = val.hour;
        this.minute = val.minute;
        this.second = val.second;
      }
      this.onChange(val);
      this.onTouch(val);
    }
  }


  constructor() {
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setTime(): void {
    this.value = {hour: this.hour, minute: this.minute, second: this.second};
  }

  // <editor-fold desc="### plus time">
  plus(type: 'hour' | 'minute' | 'second'): void {
    switch (type) {
      case 'hour': {
        this.plusHour();
        this.setTime();
        break;
      }
      case 'minute': {
        this.plusMinute();
        this.setTime();
        break;
      }
      case 'second': {
        this.plusSecond();
        this.setTime();
        break;
      }
    }
  }

  plusHour(): void {
    let current: number = Number(this.hour);
    if (current >= 23) {
      current = 0;
    } else {
      current++;
    }
    this.hour = current.toString().padStart(2, '0');
  }

  plusMinute(): void {
    let current: number = Number(this.minute);
    if (current >= 59) {
      current = 0;
    } else {
      current++;
    }
    this.minute = current.toString().padStart(2, '0');
  }

  plusSecond(): void {
    let current: number = Number(this.second);
    if (current >= 59) {
      current = 0;
    } else {
      current++;
    }
    this.second = current.toString().padStart(2, '0');
  }

  // </editor-fold>

  // <editor-fold desc="### minus time">
  minus(type: 'hour' | 'minute' | 'second'): void {
    switch (type) {
      case 'hour': {
        this.minusHour();
        this.setTime();
        break;
      }
      case 'minute': {
        this.minusMinute();
        this.setTime();
        break;
      }
      case 'second': {
        this.minusSecond();
        this.setTime();
        break;
      }
    }
  }

  minusHour(): void {
    let current: number = Number(this.hour);
    if (current <= 0) {
      current = 23;
    } else {
      current--;
    }
    this.hour = current.toString().padStart(2, '0');
  }

  minusMinute(): void {
    let current: number = Number(this.minute);
    if (current <= 0) {
      current = 59;
    } else {
      current--;
    }
    this.minute = current.toString().padStart(2, '0');
  }

  minusSecond(): void {
    let current: number = Number(this.second);
    if (current <= 0) {
      current = 59;
    } else {
      current--;
    }
    this.second = current.toString().padStart(2, '0');
  }

  // </editor-fold>

}
