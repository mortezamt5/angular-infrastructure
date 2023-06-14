import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ColumnComponent } from './column/column.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { ControlLoadingComponent } from './control-loading/control-loading.component';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { FormActionComponent } from './form-action/form-action.component';
import { FormControlComponent } from './form-control/form-control.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { GridLoadingComponent } from './grid-loading/grid-loading.component';
import { IconComponent } from './icon/icon.component';
import { PanelComponent } from './panel/panel.component';
import { RowComponent } from './row/row.component';

const COMPONENTS = [
  RowComponent,
  ColumnComponent,
  FormControlComponent,
  BreadcrumbComponent,
  IconComponent,
  FormGroupComponent,
  PanelComponent,
  ContentHeaderComponent,
  DialogContainerComponent,
  FormActionComponent,
  ConfirmDialogComponent,
  ControlLoadingComponent,
  GridLoadingComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    DragDropModule,
    MatButtonModule,
  ],
  exports: [...COMPONENTS],
})
export class AppUiComponentModule {}
