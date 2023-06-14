import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {DemoDto} from '../type/demo-dto';
import { AppGridComponent, GridAction, GridColumn, GridDataSource, GridOrder, GridPage } from 'dist';
import { GridDemoService } from '../grid-demo.service';


@Component({
  selector: 'app-remote-mode-demo',
  templateUrl: './grid-remote-demo.component.html',
  styleUrls: ['./grid-remote-demo.component.scss'],
})
export class GridRemoteDemoComponent implements OnInit {


  constructor(private service: GridDemoService) {
    this.getRemoteData = this.getRemoteData.bind(this);
  }

  columns: GridColumn[] = [
    {
      field: 'name', title: 'Name', filterable: true, sortable: true,
      rowTemplate: (data: any) => {
        if (data.isActive) {
          return `<h5>hi ${data.name.toUpperCase()}</h5>`;
        }
        return data.name;
      }
    },
    {
      field: 'birthDate', title: 'birthDate', type: 'DATE', filterable: true, rowTemplate: (data: any) => {
        return data.birthDate;
      }
    },
    {
      field: 'age', title: 'age', type: 'NUMBER', sortable: true, filterable: true
    },
    {
      field: 'registerDate', title: 'registerDate', type: 'DATE_TIME', filterable: true, sortable: true,
      rowTemplate: (data: any) => {
        return data.registerDate;
      }
    },
    {
      field: 'presentTime', title: 'presentTime', type: 'TIME', filterable: true, rowTemplate: (data: any) => {
        return data.presentTime;
      }
    },
    {field: 'cash', title: 'cash', type: 'MONEY', filterable: true},
    {
      field: 'isActive', title: 'isActive', type: 'BOOLEAN', filterable: true, rowTemplate: (data: any) => {
        return data.isActive ? '😍' : '😒';
      }
    }
  ];

  displayedColumns: string[] = [];

  dataSource: GridDataSource = {} as GridDataSource;
  @ViewChild(AppGridComponent) grid!: AppGridComponent<DemoDto>;

  actions: GridAction[] = [
    {
      type: 'BUTTON', text: 'edit', style: 'FLAT', matIcon: 'filter_list', color: (data: any) => {
        return data.age < 31 ? 'warn' : 'primary';
      }
    },
    {
      type: 'BUTTON', text: 'delete', actionClick: (data: any) => {
        console.log(data);
      }, style: 'ICON', matIcon: 'check', color: (data: any) => {
        return data.isActive ? 'warn' : 'primary';
      }
    },
    {
      type: 'BUTTON_MENU', text: 'show', actionClick: (data: any) => {
        console.log(data);
      }, color: 'warn'
    },
    {
      type: 'BUTTON_MENU', text: 'details', matIcon: 'check', disable: (row) => {
        return row.isActive;
      }, visible: (row) => {
        return row.name.includes('mor');
      },
      actionClick: (row: any) => {
        console.log(row);
      }
    }
  ];

  getRemoteData(data: any): Observable<any> {
    return this.service.getRemoteData(data);
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(m => m.field);
  }


  rowStyleCondition(data: DemoDto): string {
    let style = '';
    if (data.isActive) {
      style = 'row-class1';
    } else {
      style = 'row-class2';
    }
    return style;
  }


  rowDoubleClick(data: DemoDto): void {
    console.log(data);
  }

  selected(data: DemoDto[]): void {
    console.log(data);
  }

  page(data: GridPage): void {
    console.log(data);
  }

  sort(data: GridOrder): void {
    console.log(data);
  }
}
