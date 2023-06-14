import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-row',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class]': 'rowClass'
  }
})
export class RowComponent {

  private rowClass = 'row';
  constructor() { }
}
