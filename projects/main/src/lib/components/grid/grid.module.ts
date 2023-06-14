import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AppDatePickerModule } from '../date-picker';
import { GridActionTitleComponent } from './_helpers/grid-action/grid-action-title/grid-action-title.component';
import { GridActionComponent } from './_helpers/grid-action/grid-action.component';
import { GridCellComponent } from './_helpers/grid-cell/grid-cell.component';
import { GridFilterComponent } from './_helpers/grid-header-cell/grid-header-cell-filter-menu/grid-filter/grid-filter.component';
import { GridHeaderCellFilterMenuComponent } from './_helpers/grid-header-cell/grid-header-cell-filter-menu/grid-header-cell-filter-menu.component';
import { GridHeaderCellComponent } from './_helpers/grid-header-cell/grid-header-cell.component';
import { GridTimePickerComponent } from './_helpers/grid-time-picker/grid-time-picker.component';
import { GridToolbarComponent } from './_helpers/grid-toolbar/grid-toolbar.component';
import { GridColumnResizeDirective } from './directive/grid-column-resize.directive';
import { MoneyDirective } from './directive/money.directive';
import { AppGridComponent } from './grid.component';
import { NumberSeparatorPipe } from './pipes/number-separator.pipe';
import { GridService } from './service/grid.service';
import { AppDirectiveModule } from '../../_directives';

@NgModule({
  declarations: [
    AppGridComponent,
    GridHeaderCellComponent,
    GridHeaderCellFilterMenuComponent,
    GridCellComponent,
    GridColumnResizeDirective,
    GridFilterComponent,
    GridTimePickerComponent,
    MoneyDirective,
    NumberSeparatorPipe,
    GridActionComponent,
    GridActionTitleComponent,
    GridToolbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    AppDatePickerModule,
    AppDirectiveModule,
    TranslateModule.forChild()
  ],
  providers: [GridService],
  entryComponents: [
    GridHeaderCellComponent,
    GridHeaderCellFilterMenuComponent,
    GridCellComponent,
    GridFilterComponent,
    GridTimePickerComponent,
    GridActionComponent,
    GridActionTitleComponent,
  ],
  exports: [AppGridComponent],
})
export class AppGridModule {}
