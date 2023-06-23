import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ManufacturerService } from './manufacturer.service';

import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerInsertComponent } from './manufacturer-insert/manufacturer-insert.component';
import { ManufacturerUpdateComponent } from './manufacturer-update/manufacturer-update.component';
import { ManufacturerUpdateSpecificComponent } from './manufacturer-update-specific/manufacturer-update-specific.component';

const routes: Routes = [
  { path: 'list', component: ManufacturerListComponent },
  { path: 'insert', component: ManufacturerInsertComponent },
  { path: 'update', component: ManufacturerUpdateComponent },
  { path: 'update-speific', component: ManufacturerUpdateSpecificComponent },
];

@NgModule({
  declarations: [
    ManufacturerListComponent,
    ManufacturerInsertComponent,
    ManufacturerUpdateComponent,
    ManufacturerUpdateSpecificComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ManufacturerService],
})
export class ManufacturerModule {}
