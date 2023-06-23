import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GenderService } from './gender.service';

import { GenderListComponent } from './gender-list/gender-list.component';
import { GenderInsertComponent } from './gender-insert/gender-insert.component';
import { GenderUpdateComponent } from './gender-update/gender-update.component';
import { GenderUpdateSpecificComponent } from './gender-update-specific/gender-update-specific.component';

const routes: Routes = [
  { path: 'list', component: GenderListComponent },
  { path: 'insert', component: GenderInsertComponent },
  { path: 'update', component: GenderUpdateComponent },
  { path: 'update-speific', component: GenderUpdateSpecificComponent },
];

@NgModule({
  declarations: [
    GenderListComponent,
    GenderInsertComponent,
    GenderUpdateComponent,
    GenderUpdateSpecificComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GenderService],
})
export class GenderModule {}
