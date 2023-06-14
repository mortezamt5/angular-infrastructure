import {GridFilter} from './grid-filter';
import {GridOrder} from './grid-order';

export interface GridDataSource {
  data: any[];
  filters?: GridFilter[];
  pageIndex: number;
  pageSize: number;
  order?: GridOrder;
  count?: number;
}
