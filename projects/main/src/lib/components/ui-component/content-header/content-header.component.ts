import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-content-header',
    templateUrl: './content-header.component.html',
})
export class ContentHeaderComponent {
    @Input() icon: any;
    @Input() title: any;
    @Input() desc: any;
    @Input() hideBreadcrumb = false;
    @Input() hasBgImage = false;
    @Input() class: any;

}
