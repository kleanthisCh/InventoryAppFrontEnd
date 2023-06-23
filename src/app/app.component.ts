import { Component } from '@angular/core';
import { MenuItem } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Inventory';

  quickMenu: MenuItem[] = [
    { text: 'Incoming / Outcoming Products', link: 'quick-menu/transactions' },
  ];

  manufacturersMenu: MenuItem[] = [
    { text: 'List All Manufacturers', link: 'manufacturer/list' },
    { text: 'Insert new Manufacturer', link: 'manufacturer/insert' },
    { text: 'Update/delete Manufacturer', link: 'manufacturer/update' },
  ];
  gendersMenu: MenuItem[] = [
    { text: 'List All Genders', link: 'gender/list' },
    { text: 'Insert new Gender', link: 'gender/insert' },
    { text: 'Update/delete Gender', link: 'gender/update' },
  ];
  typesMenu: MenuItem[] = [
    { text: 'List All Types', link: 'type/list' },
    { text: 'Insert new Type', link: 'type/insert' },
    { text: 'Update/delete Type', link: 'type/update' },
  ];
  productsMenu: MenuItem[] = [
    { text: 'List All Products', link: 'product/list' },
    { text: 'Insert new Product', link: 'product/insert' },
    { text: 'Update/Delete Product', link: 'product/update' },
  ];
  barcodesMenu: MenuItem[] = [
    { text: 'List All Barcodes', link: 'barcode/list' },
    { text: 'Insert new Barcode', link: 'barcode/insert' },
    { text: 'Update Barcode', link: 'barcode/update' },
  ];
}
