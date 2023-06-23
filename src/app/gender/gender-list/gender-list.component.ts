import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenderService } from '../gender.service';
import { GenderReadOnlyDTO } from '../gender.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.css'],
})
export class GenderListComponent implements OnInit, OnDestroy {
  constructor(private service: GenderService, route: ActivatedRoute) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  gendersList: GenderReadOnlyDTO[] = [];
  subscription: Subscription | undefined;

  idSortType: 'asc' | 'desc' = 'asc';
  nameSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAllGenders API call');
    this.loading = true;
    this.subscription = this.service.getAll().subscribe({
      next: (apidata: GenderReadOnlyDTO[]) => {
        this.gendersList = apidata;
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
      case 'genderId':
        this.idSortType = this.idSortType === 'asc' ? 'desc' : 'asc';
        this.gendersList = orderBy(
          this.gendersList,
          [key],
          [this.idSortType]
        );
        break;
      case 'genderDescription':
        this.nameSortType = this.nameSortType === 'asc' ? 'desc' : 'asc';
        this.gendersList = orderBy(
          this.gendersList,
          [key],
          [this.nameSortType]
        );
        break;
    }
  }
}
