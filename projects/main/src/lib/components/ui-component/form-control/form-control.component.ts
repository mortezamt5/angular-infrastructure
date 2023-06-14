import {Component, ContentChild, ElementRef, Input, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {NgControl, NgForm} from '@angular/forms';

@Component({
    selector: 'app-form-control',
    templateUrl: './form-control.component.html',

    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        'class.mcb-form-control': 'true'
    },
    encapsulation: ViewEncapsulation.Emulated
})
export class FormControlComponent {
    @Input() label!: string;
    @Input() labelKey!: string | { key: string, subsystem: string };
    @Input() hint!: string;
    @Input() hintKey!: string | { key: string, subsystem: string };
    @Input() showValidationErrors = true;
    @ContentChild(NgControl, {static: true}) private ngCtrl!: NgControl;
    @ContentChild(NgControl, {static: true, read: ElementRef}) private ngCtrlElm!: ElementRef;
    private _firstErrorReported!: boolean;

    constructor(@Optional() private form: NgForm) {
    }

    get labelText() {
        let label;
        if (typeof this.label === 'string') {
            label = this.label;
        }
        // else if (typeof this.labelKey === 'string') {
        //     label = this.trans.instant(this.labelKey);
        // } else if (typeof this.labelKey === 'object') {
        //     const {key, subsystem} = this.labelKey;
        //     label = this.trans.instant(key, subsystem);
        // }

        return label;
    }

    get hintText() {
        let hint;
        if (typeof this.hint === 'string') {
            hint = this.hint;
        }
        // else if (typeof this.hintKey === 'string') {
        //     hint = this.trans.instant(this.hintKey);
        // } else if (typeof this.hintKey === 'object') {
        //     const {key, subsystem} = this.hintKey;
        //     hint = this.trans.instant(key, subsystem);
        // }

        return hint;
    }

    get errorText() {
        let error;
        if (this.ngCtrl && this.ngCtrl.errors && (this.ngCtrl.touched || (this.form && this.form.submitted))) {
            this._firstErrorReported = true;
            error = this.localizeError(this.ngCtrl.errors);
        }

        return error;
    }

    get required() {

        if (!this.ngCtrl) {
            return false;
        }
        if (this.ngCtrlElm.nativeElement.required) {
            return this.ngCtrlElm.nativeElement.required;
        } else if (this.ngCtrlElm.nativeElement.hasAttribute('required')) {
            return true;
        }
    }

    localizeError(err: any) {
        // let text: string;
        // if (err.required) {
        //     text = this.trans.instant('validation-err-required');
        // } else if (err.min) {
        //     text = this.trans.instant('validation-err-min').replace('{0}', err.min.requiredValue);
        // } else if (err.max) {
        //     text = this.trans.instant('validation-err-max').replace('{0}', err.min.requiredValue);
        // } else if (err.minlength) {
        //     text = this.trans.instant('validation-err-minlength').replace('{0}', err.min.requiredValue);
        // } else if (err.maxlength) {
        //     text = this.trans.instant('validation-err-maxlength').replace('{0}', err.min.requiredValue);
        // } else if (err.email) {
        //     text = this.trans.instant('validation-err-email');
        // } else if (err.pattern) {
        //     text = this.trans.instant('validation-err-pattern');
        // } else if (err.nationalCodeValidator) {
        //     text = this.trans.instant('validation-err-invalid-national-code');
        // } else if (err.mobileValidator) {
        //     text = this.trans.instant('validation-err-invalid-mobile-number');
        // } else if (err.phoneValidator) {
        //     text = this.trans.instant('validation-err-invalid-phone-number');
        // } else if (err.websiteValidator) {
        //     text = this.trans.instant('validation-err-invalid-website');
        // } else if (err.invalidDate) {
        //     text = this.trans.instant('validation-err-invalid-date');
        // } else {
        //     text = this.trans.instant('validation-err-unknown');
        // }
        // return text;
        return err;
    }

}
