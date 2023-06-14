import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-form-button',
    templateUrl: './form-button.component.html',
})
export class FormButtonComponent {

    @Input() disabled = false;
    @Input() type = 'submit';
    @Input() icon!: string;
    @Input() cancelButton = true;
    @Input() isViewMode = false;
    @Input() color: 'info' | 'warning' | 'success' | 'danger' = 'success';
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    constructor() {
    }
    cancelClick() {
        this.cancel.emit();
    }
}
