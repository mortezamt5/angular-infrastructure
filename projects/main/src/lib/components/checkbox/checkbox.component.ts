import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class CheckboxComponent
  implements OnInit, ControlValueAccessor, Validator
{
  milestone = { status: 'crossed' };

  _value: boolean | null = false;
  @Input() disabled = false;
  @Input() name!: string;
  @Input() checked = false;
  @Input() indeterminate = false;

  disableControl!: FormControl;

  ngOnInit(): void {
    this.disableControl = new FormControl(this.disabled);

    this.disableControl.valueChanges.subscribe((value) => {
      this.disabled = value;
    });
  }

  checkMilestone(milestone: any) {
    switch (milestone.status) {
      case 'checked': {
        milestone.status = 'unchecked';
        this.onChangeCallback(false);
        this._value = false;
        break;
      }
      case 'unchecked': {
        milestone.status = 'crossed';
        this.onChangeCallback(null);
        this._value = null;
        break;
      }
      case 'crossed': {
        milestone.status = 'checked';
        this.onChangeCallback(true);
        this._value = true;
        break;
      }
    }
  }

  private onTouchedCallback: any = () => {};
  private onChangeCallback: any = () => {};
  private onValidatorChangeCallback: any = () => {};

  onInputChange(event: any) {
    const newValue: boolean = event.target.checked;
    this._value = newValue;
    this.onChangeCallback(newValue);
  }

  onBlur() {
    this.onTouchedCallback();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined) {
      if (this.indeterminate) {
        this.milestone = { status: 'crossed' };
        this._value = null;
        this.onChangeCallback(null);
      } else {
        this.milestone = { status: 'unchecked' };
        this.onChangeCallback(false);
        this._value = false;
      }
    } else if (obj) {
      this.milestone = { status: 'checked' };
      this._value = true;
      this.onChangeCallback(true);
    } else if (!obj) {
      this.milestone = { status: 'unchecked' };
      this.onChangeCallback(false);
      this._value = false;
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
