import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManufacturerService } from '../manufacturer.service';
import { ManufacturerReadOnlyDTO } from '../manufacturer.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manufacturer-update',
  templateUrl: './manufacturer-update.component.html',
  styleUrls: ['./manufacturer-update.component.css'],
})
export class ManufacturerUpdateComponent implements OnInit, OnDestroy {
  newName: string = '';

  constructor(
    private mnfservice: ManufacturerService,
    private router: Router,
    route: ActivatedRoute
  ) {
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

  onUpdate(id: number, name: string) {
    this.router.navigate([
      `manufacturer/update-speific`,
      { id: id, name: name },
    ]);
  }

  onDelete(id: number) {
    this.subscription = this.mnfservice
      .deleteManufacturer(id)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate([`manufacturer/list`]);
      });
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
