import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGridComponent, GridAction, GridColumn, GridOrder, GridPage } from 'dist';

import { DemoDto } from '../type/demo-dto';
import { GridDemoService } from '../grid-demo.service';

@Component({
  selector: 'app-client-mode-demo',
  templateUrl: './grid-client-demo.component.html',
  styleUrls: ['./grid-client-demo.component.scss'],
})
export class GridClientDemoComponent implements OnInit {

  constructor(private service: GridDemoService) {
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

  dataSource: any;
  @ViewChild(AppGridComponent) grid!: AppGridComponent<DemoDto>;

  actions: GridAction[] = [
    {
      type: 'BUTTON', text: 'edit', style: 'FLAT', fontIcon: 'fa-solid fa-pen', color: (data: any) => {
        return data.age < 31 ? 'warn' : 'primary';
      }
    },
    {
      type: 'BUTTON', text: 'delete', actionClick: (data: any) => {
        console.log(data);
      }, style: 'ICON', fontIcon: 'fa-solid fa-check', color: (data: any) => {
        return data.isActive ? 'warn' : 'primary';
      }
    },
    {
      type: 'BUTTON_MENU', text: 'show', actionClick: (data: any) => {
        console.log(data);
      }, color: 'warn'
    },
    {
      type: 'BUTTON_MENU', text: 'details', fontIcon: 'fa-solid fa-check', disable: (row) => {
        return row.isActive;
      }, visible: (row) => {
        return row.name.includes('mor');
      },
      actionClick: (row: any) => {
        console.log(row);
      }
    }
  ];


  ngOnInit(): void {
    console.log('client');
    this.displayedColumns = this.columns.map(m => m.field);
    this.loadData();
  }

  refresh(): void {
    this.dataSource.push({id: 3, name: 'morteza', family: 'mousavi'});
    this.grid.refreshRows(this.dataSource);
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

  loadData(): void {
    this.service.getClientData().subscribe(result => {
      this.dataSource = result;
    });
  }

  test(): void {
    const data: number[] = Array.from(Array(10).keys());
    console.log(data);
    data.forEach(f => {
      console.log(f);
      setTimeout(() => {
        this.service.test(f).subscribe(result => {
          console.log(result, new Date());
        });
      }, 10);
    });
  }
}
