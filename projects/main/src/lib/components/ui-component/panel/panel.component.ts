import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html'
})
export class PanelComponent {

    @Input() hideBreadCrumb = false;
    @Input() hasBgImage = true;
    @Input() contentHeaderDes = '';
    @Input() contentHeaderIcon = '';
    @Input() title!: string;

}
