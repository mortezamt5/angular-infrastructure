import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [SelectComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FormsModule,
    ],
  exports: [SelectComponent]
})
export class AppSelectModule {
}
