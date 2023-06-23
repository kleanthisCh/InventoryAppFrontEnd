import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypeReadOnlyDTO } from '../type.interfaces';
import { TypeService } from '../type.service';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
  styleUrls: ['./type-update.component.css'],
})
export class TypeUpdateComponent implements OnInit, OnDestroy {
  newName: string = '';

  constructor(
    private service: TypeService,
    private router: Router,
    route: ActivatedRoute
  ) {
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
    console.log('Starting getAll Genders API call');
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

  onUpdate(id: number, description: string) {
    this.router.navigate([
      `type/update-speific`,
      { id: id, description: description },
    ]);
  }

  onDelete(id: number) {
    this.subscription = this.service.deleteType(id).subscribe((response) => {
      console.log(response);
      this.router.navigate([`type/list`]);
    });
    
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

