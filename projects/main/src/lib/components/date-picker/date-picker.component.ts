import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
// tslint:disable-next-line: max-line-length
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AppDate, AppDateDescriptor, AppDateFormat} from '../../_utils';
import {AppDatepickerI18nPersian} from './date-picker';

@Component({
    selector: 'app-date-picker',
    exportAs: 'AppDatePicker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppDatePickerComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => AppDatePickerComponent), multi: true},
        {provide: NgbCalendar, useClass: NgbCalendarPersian},
        {provide: NgbDatepickerI18n, useClass: AppDatepickerI18nPersian},
        // { provide: NgbDateParserFormatter, useClass: NgbDateParserFormatterPersian },
    ]
})
export class AppDatePickerComponent implements ControlValueAccessor, Validator {
    @Input() bindMode!: string; // Jalali | Gregorian
    @Input() disabled!: boolean;
    @Input() open = false;
    @Input() min!: AppDate;
    @Input() max!: AppDate;
    @Input() bindFormat: AppDateFormat = 'YYYYMMDD';
    @Input() format: AppDateFormat = 'YYYY/MM/DD';

    @Input() set value(v: AppDate) {
        if (v instanceof AppDate || v === null || v === undefined) {
            this._date = v;
        } else {
            throw new Error('invalid date value. valid date values: AppDate|null|undefined.');
        }

        this._isValueSet = true;
        this._updateText();
        this.fireChangeEvents();
    }

    get value() {
        return this._date;
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter<AppDate>();

    // private members
    _datePickerValue: any;
    _text!: string;
    // @ViewChild('inputRef', {static: true, read: ElementRef}) private _inputRef: ElementRef;
    private _date: AppDate | any;
    private _isValueSet!: boolean;
    private _onChangeCallback: any = () => {
    };
    private _onTouchedCallback: any = () => {
    };
    private _onValidatorChangeCallback: any = () => {
    };

    constructor(private el: ElementRef, private ngbCalendar: NgbCalendar) {
    }

    toggle() {
        this.open = !this.open;
        if (this.open) {
            // this._inputRef.nativeElement.focus();
        }
    }

    _onToggleBtnClick(event: MouseEvent) {
        event.cancelBubble = true;
        this.open = !this.open;
        if (this.open) {
            // this._inputRef.nativeElement.focus();
        }
    }

    _onInput(eventL : any) {
        if (!this._text) {
            this._date = null;
        } else {
            try {
                this._date = AppDate.parseJalaali(this._text, this.format);
                this._datePickerValue = this._date.toJalaali();
            } catch {
                this._date = AppDate.invalid();
            }
        }

        this.fireChangeEvents();
    }

    _onDateSelect(date: NgbDateStruct) {
        this.open = false;
        this._date = AppDate.fromJalaali(date as AppDateDescriptor);
        this._datePickerValue = date;
        this._updateText();
        this.fireChangeEvents();
    }

    _onBlur(event: any) {
        this._onTouchedCallback();
    }

    _onTodayClick() {
        this._onDateSelect(this.ngbCalendar.getToday());
    }

    _onInputFocus() {
        this.open = true;
    }

    _updateText() {
        this._text = this._date instanceof AppDate ? this._date.formatJalaali(this.format) : '';
    }

    _min() {
        return this.min ? this.min.toJalaali() : null;
    }

    _max() {
        return this.max ? this.max.toJalaali() : null;
    }

    @HostListener('document:click', ['$event'])
    public documentClick(event: MouseEvent): void {
        if (this.open) {
            let element: any;
            element = event.target;
            while (element) {
                if (element === this.el.nativeElement) {
                    return;
                }
                element = element.parentNode;
            }
            this.open = false;
        }
    }

    // ControlValueAccessor Implementation
    writeValue(value: any): void {
        if (this._isValueSet) {
            /* User has set "value" property. this method is called becuse the user also has put a
               ngModel directive on the input (this is mandatory).
               we should not go further beacuse this component ONLY works with one of these values:
               "string dates (ngModel) or AppDate (comes from "value" property)

               We should ignore the value that is being written. so, we call fireChangeEvents() to
               rewrite it's NgModel value (by calling  this._onChangeCallback())
            */
            this.fireChangeEvents();
            return;
        }

        if (value === null || value === undefined || value === '') {
            this._date = null;
        } else if (typeof value === 'string') {
            if (this.bindMode === 'gregorian') {
                this._onChangeCallback(this._date.formatGregorian(this.bindFormat));
            } else {
                this._onChangeCallback(this._date.formatJalaali(this.bindFormat));
            }
            this._datePickerValue = this._date.toJalaali();
        } else {
            throw new Error('invalid date value');
        }

        this._updateText();
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // End of ControlValueAccessor Implementation

    // Validator Implementation
    validate(c: AbstractControl): ValidationErrors | any {
        const err: any = {AppDatePicker: {}};

        if (!this._date) {
            return null;
        }

        if (!this._date.isValid()) {
            err.AppDatePicker.invalid = {
                value: this._text
            };
            return err;
        }

        if (this.min && this._date.isBefore(this.min)) {
            err.AppDatePicker.min = {
                min: this.min,
                date: this._date
            };
            return err;
        }

        if (this.max && this._date.isAfter(this.max)) {
            err.AppDatePicker.max = {
                max: this.max,
                date: this._date
            };
            return err;
        }

        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this._onValidatorChangeCallback = fn;
    }

    // End Validator Implementation

    private fireChangeEvents() {
        if (!this._date) {
            this._onChangeCallback(null);
            this.valueChange.emit(null);
        } else if (this._date.isValid()) {
            if (this.bindMode === 'gregorian') {
                this._onChangeCallback(this._date.formatGregorian(this.bindFormat));
            } else {
                this._onChangeCallback(this._date.formatJalaali(this.bindFormat));
            }
            this.valueChange.emit(this._date);
        } else {
            // enforce calling validate method
            this._onChangeCallback('invalid_date');
        }
    }
}

