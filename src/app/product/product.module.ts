import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProductService } from './product.service';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductUpdateSpecificComponent } from './product-update-specific/product-update-specific.component';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'insert', component: ProductInsertComponent },
  { path: 'update', component: ProductUpdateComponent },
  { path: 'update-speific', component: ProductUpdateSpecificComponent },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductInsertComponent,
    ProductUpdateComponent,
    ProductUpdateSpecificComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
