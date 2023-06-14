import { Component, OnInit, Input } from '@angular/core';
import { McbColor } from '../type/color';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent {

  defaultColor: McbColor = McbColor.GRAY;
  @Input() title!: string;
  @Input() icon!: string;
  @Input() expanded = false;
  @Input() disabled = false;
  @Input() hideToggleSign = false;
  @Input() color!: McbColor;
  constructor() { }
}
