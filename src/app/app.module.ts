import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  AppBaseModule,
  AppGridModule,
  LayoutModule,
  TranslationLoaderService,
} from 'dist';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { locale as english } from './../_i18n/app.en';
import { locale as persian } from './../_i18n/app.fa';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
const routes: Routes = [
  { path: '', redirectTo: 'grid', pathMatch: 'full' },
  {
    path: 'grid',
    loadChildren: () =>
      import('./grid/grid-demo.module').then((m) => m.GridDemoModule),
  },
  {
    path: 'select-demo',
    loadChildren: () =>
      import('./select-demo/select-demo.module').then((m) => m.SelectDemoModule),
  },
];
@NgModule({
  declarations: [AppComponent, SidebarNavigationComponent],
  imports: [
    BrowserModule,
    AppGridModule,
    LayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [TranslationLoaderService],
  bootstrap: [AppComponent],
})
export class AppModule extends AppBaseModule {
  constructor(
    translate: TranslateService,
    translationLoader: TranslationLoaderService
  ) {
    super(translate, translationLoader, [english, persian]);
  }
}
