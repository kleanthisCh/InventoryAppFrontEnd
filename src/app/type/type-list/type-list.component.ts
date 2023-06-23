import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeService } from '../type.service';
import { TypeReadOnlyDTO } from '../type.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
})
export class TypeListComponent implements OnInit, OnDestroy {
  constructor(private service: TypeService, route: ActivatedRoute) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  typesList: TypeReadOnlyDTO[] = [];
  subscription: Subscription | undefined;

  idSortType: 'asc' | 'desc' = 'asc';
  descriptionSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAll Types API call');
    this.loading = true;
    this.subscription = this.service.getAll().subscribe({
      next: (apidata: TypeReadOnlyDTO[]) => {
        this.typesList = apidata;
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
      case 'typeId':
        this.idSortType = this.idSortType === 'asc' ? 'desc' : 'asc';
        this.typesList = orderBy(this.typesList, [key], [this.idSortType]);
        break;
      case 'typeDescription':
        this.descriptionSortType =
          this.descriptionSortType === 'asc' ? 'desc' : 'asc';
        this.typesList = orderBy(
          this.typesList,
          [key],
          [this.descriptionSortType]
        );
        break;
    }
  }
}
