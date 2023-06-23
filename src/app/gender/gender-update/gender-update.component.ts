import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenderReadOnlyDTO } from '../gender.interfaces';
import { GenderService } from '../gender.service';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gender-update',
  templateUrl: './gender-update.component.html',
  styleUrls: ['./gender-update.component.css'],
})
export class GenderUpdateComponent implements OnInit, OnDestroy {
  newName: string = '';

  constructor(
    private service: GenderService,
    private router: Router,
    route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      this.ngOnInit();
    });
  }

  loading = false;
  gendersList: GenderReadOnlyDTO[] = [];
  subscription: Subscription | undefined;

  idSortType: 'asc' | 'desc' = 'asc';
  descriptionSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting getAll Genders API call');
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

  onUpdate(id: number, description: string) {
    this.router.navigate([
      `gender/update-speific`,
      { id: id, description: description },
    ]);
  }

  onDelete(id: number) {
    this.subscription = this.service.deleteGender(id).subscribe((response) => {
      console.log(response);
      this.router.navigate([`gender/list`]);
    });
  }

  toggleSort(key: string) {
    switch (key) {
      case 'genderId':
        this.idSortType = this.idSortType === 'asc' ? 'desc' : 'asc';
        this.gendersList = orderBy(this.gendersList, [key], [this.idSortType]);
        break;
      case 'genderDescription':
        this.descriptionSortType =
          this.descriptionSortType === 'asc' ? 'desc' : 'asc';
        this.gendersList = orderBy(
          this.gendersList,
          [key],
          [this.descriptionSortType]
        );
        break;
    }
  }
}
