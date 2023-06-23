import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductReadOnlyDTO } from '../product.interfaces';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  newName: string = '';

  constructor(
    private service: ProductService,
    private router: Router,
    route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  productsList: ProductReadOnlyDTO[] = [];
  subscription: Subscription | undefined;

  idSortType: 'asc' | 'desc' = 'asc';
  modelSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAll Products API call');
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
        console.log('API completed');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onUpdate(
    productId: number,
    model: string,
    genderId: number,
    genderDescription: string,
    manufacturerId: number,
    manufacturerName: string,
    typeId: number,
    typeDescription: string,
    description: string
  ) {
    this.router.navigate([
      `product/update-speific`,
      {
        productId: productId,
        model: model,
        genderId: genderId,
        genderDescription: genderDescription,
        manufacturerId: manufacturerId,
        manufacturerName: manufacturerName,
        typeId: typeId,
        typeDescription: typeDescription,
        description: description,
      },
    ]);
  }

  onDelete(id: number) {
    this.subscription = this.service.deleteProduct(id).subscribe((response) => {
      console.log(response);
      this.router.navigate([`product/list`]);
    });
    //this.router.navigate([`product/list`]);
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
