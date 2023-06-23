import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { QuickMenuService } from './quick-menu.service';

import { QuickMenuTransactionsComponent } from './quick-menu.transactions/quick-menu-transactions.component';

const routes: Routes = [
  { path: 'transactions', component: QuickMenuTransactionsComponent },
];

@NgModule({
  declarations: [QuickMenuTransactionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [QuickMenuService],
})
export class QuickMenuModule {}
