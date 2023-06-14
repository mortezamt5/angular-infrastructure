import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GridFilter} from '../type/grid-filter';
import {GridColumn} from '../type';

@Injectable()
export class GridService {

  filterData: BehaviorSubject<GridFilter | null> = new BehaviorSubject<GridFilter | null>(null);
  columnFilteredData: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  filterClear: BehaviorSubject<GridColumn | null> = new BehaviorSubject<GridColumn | null>(null);
  closePanel: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }
}
