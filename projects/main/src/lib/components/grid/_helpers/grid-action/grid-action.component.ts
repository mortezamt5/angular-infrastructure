import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GridAction} from '../../type';

@Component({
  selector: 'app-grid-action',
  templateUrl: './grid-action.component.html',
  // styleUrls: ['./grid-action.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class GridActionComponent implements OnInit {

  @Input() actions: GridAction[] = [];
  @Input() row: any;

  buttonActions: GridAction[] = [];
  menuActions: GridAction[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.buttonActions = this.actions.filter(a => a.type === 'BUTTON');
    this.menuActions = this.actions.filter(a => a.type === 'BUTTON_MENU');
  }

  handleFilterClick(e: any, menu: any): boolean {
    e.stopPropagation();
    menu.openMenu();
    return true;
  }

  isFunction(data: any): boolean {
    return typeof data === 'function';
  }

  handleFunctionCall(funcData: any, row: any): any {
    if (funcData) {
      if (this.isFunction(funcData)) {
        return funcData(row);
      }
      else{
        return funcData;
      }
    }
  }
}
