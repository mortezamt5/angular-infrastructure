import { Component } from '@angular/core';
import { GridColumn } from 'dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sidebarItems: any[] = [
    {title: ''}
  ];
}
