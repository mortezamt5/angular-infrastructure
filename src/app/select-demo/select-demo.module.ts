import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDemoComponent } from './select-demo/select-demo.component';
import { RouterModule, Routes } from '@angular/router';
import { AppSelectModule, AppUiComponentModule, LayoutModule } from 'dist';

const routes: Routes = [
  {
    path: '',
    component: SelectDemoComponent,
  },
];

@NgModule({
  declarations: [SelectDemoComponent],
  imports: [CommonModule, RouterModule.forChild(routes) , AppSelectModule , LayoutModule , AppUiComponentModule],
})
export class SelectDemoModule {}
