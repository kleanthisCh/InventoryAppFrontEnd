import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductReadOnlyDTO, Barcode } from '../product.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private service: ProductService, route: ActivatedRoute) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  productsList: ProductReadOnlyDTO[] = [];
  productQuantityList: Number[] = [];
  subscription: Subscription | undefined;

  idSortType: 'asc' | 'desc' = 'asc';
  modelSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAllGenders API call');
    this.loading = true;
    this.subscription = this.service.getAll().subscribe({
      next: (apidata: ProductReadOnlyDTO[]) => {
        this.productsList = apidata;
        
        console.log(apidata);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: () => {
        this.loading = false;
        for (var product of this.productsList) {
          var sum = 0;
          for (var barcode of product.barcodes) {
            sum = sum + barcode.quantity;
          }
          this.productQuantityList.push(sum);
        }
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
        this.idSortType = this.idSortType === 'asc' ? 'desc' : 'asc';
        this.productsList = orderBy(
          this.productsList,
          [key],
          [this.idSortType]
        );
        break;
      case 'model':
        this.modelSortType = this.modelSortType === 'asc' ? 'desc' : 'asc';
        this.productsList = orderBy(
          this.productsList,
          [key],
          [this.modelSortType]
        );
        break;
    }
  }
}

