import {TitleKey} from './title-key';

export class GridColumn {
  field = '';
  title?: string;
  titleKey?: string | TitleKey;
  align?: 'LEFT' | 'RIGHT' | 'CENTER';
  type?: 'NUMBER' | 'STRING' | 'BOOLEAN' | 'MONEY' | 'DATE_TIME' | 'DATE' | 'TIME';
  locked?: boolean;
  sortable?: boolean;
  width?: number;
  filterable?: boolean;
  rowTemplate?: ((dataItem: any) => any) = () => '';
}
