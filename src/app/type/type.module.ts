import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TypeService } from './type.service';

import { TypeListComponent } from './type-list/type-list.component';
import { TypeUpdateSpecificComponent } from './type-update-specific/type-update-specific.component';
import { TypeUpdateComponent } from './type-update/type-update.component';
import { TypeInsertComponent } from './type-insert/type-insert.component';

const routes: Routes = [
  { path: 'list', component: TypeListComponent },
  { path: 'insert', component: TypeInsertComponent },
  { path: 'update', component: TypeUpdateComponent },
  { path: 'update-speific', component: TypeUpdateSpecificComponent },
];


@NgModule({
  declarations: [
    TypeListComponent,
    TypeUpdateSpecificComponent,
    TypeUpdateComponent,
    TypeInsertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [TypeService],
})
export class TypeModule {}
