import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeReadOnlyDTO } from '../barcode.interfaces';
import { BarcodeService } from '../barcode.service';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-barcode-update',
  templateUrl: './barcode-update.component.html',
  styleUrls: ['./barcode-update.component.css'],
})
export class BarcodeUpdateComponent implements OnInit, OnDestroy {
  newName: string = '';

  constructor(
    private service: BarcodeService,
    private router: Router,
    route: ActivatedRoute
  ) {
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

  onUpdate(barcodeId: string, model: string, productId: number, size:string, quantity:number) {
    this.router.navigate([
      `barcode/update-speific`,
      {
        barcodeId: barcodeId,
        model: model,
        productId: productId,
        size: size,
        quantity: quantity,
      },
    ]);
  }

  onDelete(id: string) {
    this.subscription = this.service.deleteBarcode(id).subscribe((response) => {
      console.log(response);
      this.router.navigate([`barcode/list`]);
    });
    
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

