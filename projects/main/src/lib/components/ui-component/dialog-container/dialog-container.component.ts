import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-dialog-container',
    templateUrl: './dialog-container.component.html'
})
export class DialogContainerComponent {

    @Input() crudMode!: 'ADD' | 'EDIT';
    @Input() title = '';
    @Input() icon!: string;
    @Input() color!: 'info' | 'warning' | 'danger' | 'success' | any;
}
