import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GridColumn} from '../../../type';
import {GridService} from '../../../service/grid.service';

@Component({
  selector: 'app-grid-header-cell-filter-menu',
  templateUrl: './grid-header-cell-filter-menu.component.html',
  // encapsulation: ViewEncapsulation.None
})
export class GridHeaderCellFilterMenuComponent implements OnInit {

  @Input() intl!: string;
  @Input() column: GridColumn = {} as GridColumn;

  columnType = 'STRING';
  // @ViewChild(MatMenu) menu!: MatMenu;
  panel: any;

  constructor(private GridService: GridService) {
  }

  ngOnInit(): void {
    this.columnType = this.column.type ? this.column.type : 'STRING';

    this.GridService.columnFilteredData.asObservable().subscribe(result => {
      this.manageFilterStyle(result);
    });

    this.GridService.closePanel.asObservable().subscribe(result => {
      if (result) {
        if (this.panel) {
          this.panel.closeMenu();
        }
      }
    });
  }

  handleFilterClick(e: any, menu: any): boolean {
    e.stopPropagation();
    menu.openMenu();
    this.panel = menu;
    return true;
  }

  manageFilterStyle(data: string[]): void {
    if (data) {
      this.removeSelectedFilterClass();
      data.forEach(d => {
        const current = document.getElementById(`grid-filter-menu-${d}`);
        if (current) {
          current.classList.add('selected');
        }
      });
    }
  }

  removeSelectedFilterClass(): void {
    const filterClasses = document.querySelectorAll('.grid-filter-menu');
    [].forEach.call(filterClasses, (el: any) => {
      el.classList.remove('selected');
    });
  }

}
