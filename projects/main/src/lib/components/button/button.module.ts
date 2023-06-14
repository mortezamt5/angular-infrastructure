import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ToolbarButtonComponent,
    FormButtonComponent,
    IconButtonComponent,
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [
    ToolbarButtonComponent,
    FormButtonComponent,
    IconButtonComponent,
  ],
})
export class AppButtonModule {}
