import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import { AppSelectService } from './select.service';
import { AppSelectDto } from './type/select-dto';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true
};
export type dataFn = (data: any) => any;

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, AppSelectService],
    encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements ControlValueAccessor, Validator, OnInit {

    constructor(private service: AppSelectService) {
    }

    _lazy = false;
    selectedValue: any;
    selectedText: any;

    _isAlive = false;
    _data: any[] = [];
    _showSpinner = false;

    clearObject: AppSelectDto = new AppSelectDto('', '');

    @ViewChild('mcbSelectComponent') mcbSelectComponent!: ElementRef;
    @Output() selectedChange: EventEmitter<any> = new EventEmitter();
    @Input() valueField!: string;
    @Input() textField!: string;
    @Input() valuePrimitive = false;
    @Input() name!: string;
    @Input() disabled = false;
    @Input() listHeight = 200;
    @Input() defaultValue = 'انتخاب نمایید';
    @Input() defaultItem: any;
    @Input() readonly = false;
    @Input() filterable = false;
    @Input() required = false;
    @Input() multiple = false;
    @Input() filterLabel = 'جستجو ...';

    @Input() data: any[] | dataFn | any = () => [];


    private onTouchedCallback: any = () => {
    }
    private onChangeCallback: any = () => {
    }
    private onValidatorChangeCallback: any = () => {
    }


    ngOnInit(): void {
        this.selectedText = '';
        this._isAlive = true;
        if (this.data instanceof Observable) {
            // console.log("data = >" + JSON.stringify(this.data));
            // console.log("______________data = >" + JSON.stringify(this._data));
            this._lazy = true;
            this.service.options.pipe(takeWhile(() => this._isAlive)).subscribe(serviceData => {
                if (serviceData) {
                    this._data = serviceData.data === null ? [] : serviceData.data;
                    this._showSpinner = false;
                }
            });
        }
    }

    validate(control: AbstractControl): AbstractControl | null {
        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onValidatorChangeCallback = fn;
    }

    writeValue(obj: any): void {
        if (obj !== undefined || obj !== null) {
            this.injectTextForLazySelect(obj, false);
            this.onChangeCallback(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    selectionChange(data: any) {
        if (data && data.value) {
            if (data.value instanceof Array) {
                const dataItems: AppSelectDto[] = [];
                data.value.forEach((s: any, i: number) => {
                    const target = data.source.selected[i]._element.nativeElement;
                    const valueItem = s;
                    dataItems.push(new AppSelectDto(target.innerText.trim(), valueItem));
                });
                if (this.valuePrimitive) {
                    const values: any[] = [];
                    data.value.forEach((s: any, i: number) => {
                        const valueItem = s;
                        values.push(valueItem);
                    });
                    this.onChangeCallback(values);
                    this.selectedChange.emit(values);
                } else {
                    this.onChangeCallback(dataItems);
                    this.selectedChange.emit(dataItems);
                }
                this.injectTextForLazySelect(dataItems, true);
            } else {
                const target = data.source.selected._element.nativeElement;
                const dataItem: AppSelectDto = new AppSelectDto(target.innerText.trim(), data.value);
                this.injectTextForLazySelect(dataItem, true);
                if (this.valuePrimitive) {
                    this.onChangeCallback(data.value);
                    this.selectedChange.emit(data.value);
                } else {
                    this.onChangeCallback(dataItem);
                    this.selectedChange.emit(dataItem);
                }
            }
        } else {
            this.onChangeCallback(this.clearObject);
            this.selectedChange.emit(this.clearObject);
            this.injectTextForLazySelect(this.clearObject, true);
        }
    }

    getDataLazy() {
        this._showSpinner = true;
        this._data = [];
        this.service.getOptions(this.data);
    }

    filterChange(event: any) {
        const value = event.target.value;
        const data = this.data;
        // filter by textValue
        const result = this.filterData(value.toString());
        this.data = result;
        // console.log(result);
        // if (result.length > 0)
        //   this.data = result;
        // else
        //   this.data = data;
    }

    filterChangeOnLazy(event: any) {
        const value = event.target.value;
        // let result = this.filterData(value,this.data);
        // this._data = result;
    }

    filterData(query: any) {
        const result: string[] = [];
        for (const a of <any[]>this.data) {
            if (a[this.textField].toLowerCase().indexOf(query) > -1) {
                result.push(a);
            }
        }
        return result;
    }


    injectTextForLazySelect(obj: any, textOnly: boolean): void {
        if (obj instanceof Object) {
            if (obj instanceof Array) {
                const values: any[] = [];
                const textValues: any[] = [];
                obj.forEach(item => {
                    if (item instanceof Object) {
                        if (!textOnly) {
                            values.push(item[this.valueField]);
                        }
                        textValues.push(item[!textOnly ? this.textField : 'text']);
                    } else {
                        values.push(item);
                    }
                });
                if (!textOnly) {
                    this.selectedValue = values;
                }
                this.selectedText = textValues.toString();
            } else {
                if (!textOnly) {
                    this.selectedValue = obj[this.valueField];
                }
                this.selectedText = obj[!textOnly ? this.textField : 'text'];
            }
        } else {
            if (!textOnly) {
                this.selectedValue = obj;
            }
        }
    }
}
