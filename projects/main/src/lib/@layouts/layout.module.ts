import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  MainWrapperComponent,
  SidebarComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
