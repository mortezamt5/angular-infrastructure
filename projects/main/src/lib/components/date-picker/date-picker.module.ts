import { AppDirectiveModule } from '../../_directives';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppDatePickerComponent],
  imports: [CommonModule, FormsModule, NgbDatepickerModule, AppDirectiveModule , MatDatepickerModule , MatFormFieldModule , MatInputModule],
  exports: [AppDatePickerComponent],
})
export class AppDatePickerModule {}
