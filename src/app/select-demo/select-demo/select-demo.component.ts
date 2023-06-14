import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-demo',
  templateUrl: './select-demo.component.html',
  styleUrls: ['./select-demo.component.scss']
})
export class SelectDemoComponent implements OnInit {

  dataSource!: any;
  constructor() { }

  ngOnInit(): void {
    this.dataSource = [{id: 1 , name: 'morteza'}]
  }

}
