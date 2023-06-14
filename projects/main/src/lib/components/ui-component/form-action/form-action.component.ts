import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-form-action',
    templateUrl: './form-action.component.html',
})
export class FormActionComponent {

    @Input() crudMode!: 'ADD' | 'EDIT';
    @Input() title = '';
    @Input() icon!: string;
}
