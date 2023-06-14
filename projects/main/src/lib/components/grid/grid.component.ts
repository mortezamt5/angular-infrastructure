import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { GridService } from './service/grid.service';
import {
  GridPage,
  OPERATOR_SIGN,
  GridFilterPredicate,
  GridOrder,
  GridFilter,
  GridAction,
  GridColumn,
  GridDataSource,
} from './type';
import { isObservable, Observable } from 'rxjs';

export type observableDatasourceFn = (
  data?: GridDataSource
) => Observable<any[]>;
export type dataSourceFn = () => any[];

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
})
export class AppGridComponent<T> implements OnInit, AfterViewInit {
  constructor(private GridService: GridService) {}

  isLoading = false;

  @Input() dataSource!: observableDatasourceFn | dataSourceFn | any[];
  @Input() remotePagination = false;
  currentRemotePaginationData: GridDataSource = {} as GridDataSource;
  data: any;
  matData: MatTableDataSource<any> = new MatTableDataSource();
  filteredData: any = null;

  @Input() columns: GridColumn[] = [];

  @Input() pageable = false;
  @Input() selectable = false;
  @Input() resizable = false;

  @Input() itemPerPage: number[] = [5, 10, 15];
  @Input() defaultItemPerPage = 5;

  pageIndex = 0;
  pageSize = 5;

  @Input() actions: GridAction[] = [];
  @Input() toolbar = true;

  @Input() intl: 'fa' | 'en' = 'fa';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];

  @ViewChild(MatTable) table!: MatTable<any>;

  filterData: GridFilter[] = [];
  columnFilteredData: string[] = [];
  selection = new SelectionModel<any>(true, []);

  @Output() selectChange: EventEmitter<T[]> = new EventEmitter();
  @Output() rowDoubleClick: EventEmitter<T> = new EventEmitter();
  @Output() pageChange: EventEmitter<GridPage> = new EventEmitter();
  @Output() filterChange: EventEmitter<GridFilter[]> = new EventEmitter();
  @Output() sortChange: EventEmitter<GridOrder> = new EventEmitter();
  @Output() refreshChange: EventEmitter<any> = new EventEmitter();

  @Input() rowStyleCondition: (dataItem: any) => any = () => '';

  ngOnInit(): void {
    this.pageSize = this.defaultItemPerPage;
    this.displayedColumns = this.columns.map((m) => m.field);
    this.displayedColumns.push('actions');
    if (this.selectable) {
      this.displayedColumns.unshift('select');
    }
    this.GridService.filterData.asObservable().subscribe((result) => {
      if (result) {
        const sameColumns = this.filterData.filter(
          (f) => f.column.field === result.column.field
        );
        if (sameColumns.length > 0) {
          this.removeFilterDataByColumn(result.column.field);
          this.filteredData = null;
        }
        this.filterData.push(result);
        this.filterData = this.removeDuplicate(this.filterData);
        this.columnFilteredData = this.filterData.map((m) => m.column.field);
        this.GridService.columnFilteredData.next(this.columnFilteredData);
        this.filter(this.filterData);
      }
    });
    this.GridService.filterClear.asObservable().subscribe((result) => {
      if (result) {
        this.removeFilterDataByColumn(result.field);
        this.columnFilteredData = this.filterData.map((m) => m.column.field);
        this.GridService.columnFilteredData.next(this.columnFilteredData);
        this.filteredData = null;
        if (this.columnFilteredData.length === 0) {
          this.setLocalData(
            this.dataSource instanceof Function
              ? this.dataSource()
              : this.dataSource
          );
        } else {
          this.filter(this.filterData);
        }
      }
    });
    this.selection.changed.subscribe((result) => {
      this.selectChange.emit(this.selection.selected);
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource instanceof Function) {
      this.isLoading = true;
      if (isObservable(this.dataSource())) {
        if (this.remotePagination) {
          this.loadRemotePaginationData();
        } else {
          const fn: any = this.dataSource();
          fn.subscribe(
            (result: GridDataSource | any) => {
              this.matData = new MatTableDataSource(result);
              this.matData.paginator = this.paginator;
              this.matData.sort = this.sort;
            },
            (error: any) => {
              this.isLoading = false;
            }
          );
        }
      } else {
        this.setLocalData(this.dataSource());
        this.isLoading = false;
      }
    } else {
      this.setLocalData(this.dataSource);
    }
    this.chnageIntlPaginator(this.intl);
  }

  // <editor-fold desc="selection">
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.matData ? this.matData.data.length : this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): any {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...(this.matData ? this.matData.data : this.data));
  }

  // </editor-fold>

  setLocalData(data: any): void {
    this.matData = new MatTableDataSource<any>(data);
    this.matData.paginator = this.paginator;
    this.matData.sort = this.sort;
  }

  refreshRows(data: any): void {
    if (this.table) {
      this.setLocalData(data);
      this.table.renderRows();
    }
  }

  removeDuplicate(arr: any[]): any {
    return [
      ...new Map(arr.map((item) => [JSON.stringify(item), item])).values(),
    ];
  }

  removeFilterDataByColumn(column: string): void {
    const current: any = this.filterData.find((f) => f.column.field === column);
    console.log('current', current);
    if (current) {
      const index = this.filterData.indexOf(current);
      if (index > -1) {
        this.filterData.splice(index, 1);
      }
    }
  }

  handleSortChange(sort: Sort): void {
    const data: GridOrder = {
      field: sort.active,
      type: sort.direction.toUpperCase(),
    };
    this.sortChange.emit(data);
    this.currentRemotePaginationData.order = data;
    this.loadRemotePaginationData();
  }

  handlePageChange(page: PageEvent): void {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    if (this.remotePagination) {
      this.loadRemotePaginationData();
    }
    this.pageChange.emit(page);
  }

  filter(filterData: GridFilter[]): void {
    if (this.matData) {
      filterData.forEach((f: GridFilter) => {
        const query: GridFilterPredicate = this.processQuery(f);
        if (query) {
          const p: any = this.processPredicate(query);
          if (p) {
            let currentFilter: any[] = [];
            if (this.filteredData) {
              currentFilter = this.filteredData.filter(p);
            } else {
              currentFilter = this.matData ? this.matData.data.filter(p) : [];
              console.log('currentFilter', currentFilter);
            }
            this.filteredData = currentFilter;
            this.setLocalData(currentFilter);
          }
        }
      });
    }
    this.filterChange.emit(filterData);
    if (this.remotePagination) {
      this.currentRemotePaginationData.filters = filterData;
      this.loadRemotePaginationData();
    }
  }

  parseToNative(val: any): any {
    return isNaN(val)
      ? val === 'true' || val === 'false'
        ? val === 'true'
        : val
      : Number(val);
  }

  processPredicate(predicate: GridFilterPredicate): any {
    let fReturn: any = () => false;
    if (predicate) {
      switch (predicate.operator) {
        case '<':
          fReturn = (obj: any) => obj[predicate.field] < predicate.values[0];
          break;
        case '>':
          fReturn = (obj: any) => obj[predicate.field] > predicate.values[0];
          break;
        case '<=':
          fReturn = (obj: any) => obj[predicate.field] <= predicate.values[0];
          break;
        case '>=':
          fReturn = (obj: any) => obj[predicate.field] >= predicate.values[0];
          break;
        case '%':
          fReturn = (obj: any) =>
            obj[predicate.field].toString().includes(predicate.values[0]);
          break;
        case '!%':
          fReturn = (obj: any) =>
            !obj[predicate.field].toString().includes(predicate.values[0]);
          break;
        case '~=':
          fReturn = (obj: any) =>
            obj[predicate.field].toString().startsWith(predicate.values[0]);
          break;
        case '=~':
          fReturn = (obj: any) =>
            obj[predicate.field].toString().endsWith(predicate.values[0]);
          break;
        case '<>':
          fReturn = (obj: any) =>
            obj[predicate.field] >= predicate.values[0] &&
            obj[predicate.field] <= predicate.values[1];
          break;
        case '^':
          fReturn = (obj: any) =>
            obj[predicate.field] === null ||
            obj[predicate.field] === undefined ||
            obj[predicate.field] === '';
          break;
        case '!^':
          fReturn = (obj: any) =>
            !(
              obj[predicate.field] === null ||
              obj[predicate.field] === undefined ||
              obj[predicate.field] === ''
            );
          break;
        default:
          fReturn = (obj: any) => obj[predicate.field] === predicate.values[0];
          break;
      }
    }
    return fReturn;
  }

  processQuery(filterData: GridFilter): GridFilterPredicate {
    const result: GridFilterPredicate = {} as GridFilterPredicate;
    const sign = OPERATOR_SIGN.filter((f) => f.key === filterData.operator);
    if (sign && sign.length > 0) {
      result.operator = sign[0].value;
      result.field = filterData.column.field;
      result.values = filterData.values;
      if (
        filterData.column.type === 'MONEY' ||
        filterData.column.type === 'NUMBER'
      ) {
        const data = result.values.map((m) =>
          Number(m.toString().replace(',', ''))
        );
        result.values = data;
      }
      if (filterData.column.type === 'BOOLEAN') {
        const data = result.values.map((m) => m === 'True');
        result.values = data;
      }
    }
    return result;
  }

  handleReset(): void {
    if (this.matData) {
      this.removeSelectedFilterClass();
      this.filterData = [];
      this.filteredData = [];
      this.setLocalData(this.matData);
    } else {
      this.refreshChange.emit();
    }
  }

  removeSelectedFilterClass(): void {
    const filterClasses = document.querySelectorAll('.grid-filter-menu');
    [].forEach.call(filterClasses, (el: any) => {
      el.classList.remove('selected');
    });
  }

  loadRemotePaginationData(): void {
    this.isLoading = true;
    this.currentRemotePaginationData.pageSize = this.pageSize;
    this.currentRemotePaginationData.pageIndex = this.pageIndex;
    // @ts-ignore
    this.dataSource(this.currentRemotePaginationData).subscribe(
      (result: GridDataSource | any) => {
        this.isLoading = false;
        this.matData.data = result.data;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.length = result.count;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  chnageIntlPaginator(type: string) {
    switch (type) {
      case 'fa':
        this.paginator._intl.itemsPerPageLabel = 'رکورد در هر صفحه :';
        this.paginator._intl.nextPageLabel = 'صفحه بعد';
        this.paginator._intl.previousPageLabel = 'صفحه قبل';
        break;

      case 'en':
        this.paginator._intl.itemsPerPageLabel = 'Record Per Page :';
        this.paginator._intl.nextPageLabel = 'Next Page';
        this.paginator._intl.previousPageLabel = 'Previous Page';
        break;
    }
    this.paginator._intl.getRangeLabel = this.rangeLabel;
  }

  rangeLabel = (page: number, pageSize: number, length: number) => {
    const label = this.intl === 'fa' ? 'از' : 'of';
    if (length === 0 || pageSize === 0) {
      return `0 ${label} ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${label} ${length}`;
  };
}
