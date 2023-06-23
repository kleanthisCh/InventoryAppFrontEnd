import { Component, OnInit,OnDestroy } from '@angular/core';
import { ManufacturerService } from '../manufacturer.service';
import { ManufacturerReadOnlyDTO } from '../manufacturer.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css'],
})
export class ManufacturerListComponent implements OnInit, OnDestroy {
  constructor(private mnfservice: ManufacturerService, route: ActivatedRoute) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  manufacturersList: ManufacturerReadOnlyDTO[] = [];
  subscription: Subscription | undefined;

  idSortType: 'asc' | 'desc' = 'asc';
  nameSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAllManufacturers API call');
    this.loading = true;
    this.subscription = this.mnfservice.getAll().subscribe({
      next: (apidata: ManufacturerReadOnlyDTO[]) => {
        this.manufacturersList = apidata;
        // this.manufacturersList.sort((a, b) =>
        //   a.manufacturerId < b.manufacturerId ? -1 : 1
        // );
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
      case 'manufacturerId':
        this.idSortType = this.idSortType === 'asc' ? 'desc' : 'asc';
        this.manufacturersList = orderBy(
          this.manufacturersList,
          [key],
          [this.idSortType]
        );
        break;
      case 'manufacturerName':
        this.nameSortType = this.nameSortType === 'asc' ? 'desc' : 'asc';
        this.manufacturersList = orderBy(
          this.manufacturersList,
          [key],
          [this.nameSortType]
        );
        break;
    }
  }
}
