import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input() title = 'Project Name';
  @Input() logo = '';
  constructor() { }
}
