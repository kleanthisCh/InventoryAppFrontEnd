import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { GenderModule } from './gender/gender.module';
import { TypeModule } from './type/type.module';
import { ProductModule } from './product/product.module';
import { BarcodeModule } from './barcode/barcode.module';
import { QuickMenuModule } from './quick-menu/quick-menu.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { from } from 'rxjs';
import { DropdownComponent } from './dropdown/dropdown.component';

const routes: Routes = [
  {
    path: 'quick-menu',
    loadChildren: () =>
      import('./quick-menu/quick-menu.module').then((m) => m.QuickMenuModule),
  },
  {
    path: 'manufacturer',
    loadChildren: () =>
      import('./manufacturer/manufacturer.module').then(
        (m) => m.ManufacturerModule
      ),
  },
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then((m) => m.TypeModule),
  },
  {
    path: 'gender',
    loadChildren: () =>
      import('./gender/gender.module').then((m) => m.GenderModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'barcode',
    loadChildren: () =>
      import('./barcode/barcode.module').then((m) => m.BarcodeModule),
  },
  { path: '', component: WelcomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    DropdownComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),ManufacturerModule,TypeModule,GenderModule,ProductModule,BarcodeModule,QuickMenuModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
