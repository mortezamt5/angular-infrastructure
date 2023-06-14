import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { AppGridModule } from 'dist';

import { GridClientDemoComponent } from './client/grid-client-demo.component';
import { GridDemoService } from './grid-demo.service';
import { GridRemoteDemoComponent } from './remote/grid-remote-demo.component';
import { GridDemoComponent } from './grid-demo.component';

const routes: Routes = [
  {
    path: '',
    component: GridDemoComponent,
    children: [
      { path: '', redirectTo: 'client', pathMatch: 'full' },
      { path: 'client', component: GridClientDemoComponent },
      { path: 'remote', component: GridRemoteDemoComponent },
    ],
  },
];

@NgModule({
  declarations: [
    GridClientDemoComponent,
    GridRemoteDemoComponent,
    GridDemoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppGridModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  providers: [GridDemoService],
})
export class GridDemoModule {}
