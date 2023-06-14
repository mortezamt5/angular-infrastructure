import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-button',
  templateUrl: './toolbar-button.component.html'
})
export class ToolbarButtonComponent{

  @Input() disabled = false;
  constructor() { }
}
