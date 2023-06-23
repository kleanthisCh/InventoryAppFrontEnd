import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BarcodeService } from './barcode.service';

import { BarcodeListComponent } from './barcode-list/barcode-list.component';
import { BarcodeUpdateSpecificComponent } from './barcode-update-specific/barcode-update-specific.component';
import { BarcodeUpdateComponent } from './barcode-update/barcode-update.component';
import { BarcodeInsertComponent } from './barcode-insert/barcode-insert.component';

const routes: Routes = [
  { path: 'list', component: BarcodeListComponent },
  { path: 'insert', component: BarcodeInsertComponent },
  { path: 'update', component: BarcodeUpdateComponent },
  { path: 'update-speific', component: BarcodeUpdateSpecificComponent },
];

@NgModule({
  declarations: [
    BarcodeListComponent,
    BarcodeUpdateSpecificComponent,
    BarcodeUpdateComponent,
    BarcodeInsertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[BarcodeService]
})
export class BarcodeModule {}
