import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeService } from '../barcode.service';
import { BarcodeReadOnlyDTO } from '../barcode.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barcode-list',
  templateUrl: './barcode-list.component.html',
  styleUrls: ['./barcode-list.component.css'],
})
export class BarcodeListComponent implements OnInit, OnDestroy {
  constructor(private service: BarcodeService, route: ActivatedRoute) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  barcodesList: BarcodeReadOnlyDTO[] = [];
  subscription: Subscription | undefined;

  productIdSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAll Barcodes API call');
    this.loading = true;
    this.subscription = this.service.getAll().subscribe({
      next: (apidata: BarcodeReadOnlyDTO[]) => {
        this.barcodesList = apidata;
        console.log(apidata);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: () => {
        this.loading = false;
        console.log('API completed');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleSort(key: string) {
    switch (key) {
      case 'productId':
        this.productIdSortType =
          this.productIdSortType === 'asc' ? 'desc' : 'asc';
        this.barcodesList = orderBy(
          this.barcodesList,
          [key],
          [this.productIdSortType]
        );
        break;
    }
  }
}

