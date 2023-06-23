import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductUpdateDTO } from '../product.interfaces';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  GenderReadOnlyDTO,
  GenderUpdateDTO,
} from 'src/app/gender/gender.interfaces';
import { ManufacturerReadOnlyDTO } from 'src/app/manufacturer/manufacturer.interfaces';
import { TypeReadOnlyDTO } from 'src/app/type/type.interfaces';
import { GenderService } from 'src/app/gender/gender.service';
import { ManufacturerService } from 'src/app/manufacturer/manufacturer.service';
import { TypeService } from 'src/app/type/type.service';

@Component({
  selector: 'app-product-update-specific',
  templateUrl: './product-update-specific.component.html',
  styleUrls: ['./product-update-specific.component.css'],
})
export class ProductUpdateSpecificComponent implements OnInit, OnDestroy {
  productId: number | undefined;
  oldDescription: string | null = '';
  form: FormGroup;
  subscription: Subscription | undefined;
  genders: GenderReadOnlyDTO[] = [];
  types: TypeReadOnlyDTO[] = [];
  mnfrs: ManufacturerReadOnlyDTO[] = [];
  model: string | null = '';
  genderId: number | undefined;
  genderDescription: string | null = '';
  manufacturerId: number | undefined;
  manufacturerName: string | null = '';
  typeId: number | undefined;
  typeDescription: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ProductService,
    private gndrservice: GenderService,
    private tpservice: TypeService,
    private mnfrservice: ManufacturerService
  ) {
    this.form = this.fb.group({
      model: ['', [Validators.required, Validators.minLength(5)]],
      genderId: [
        '',
        [Validators.required, Validators.min(1), Validators.max(9)],
      ],
      typeId: ['', [Validators.required, Validators.min(1), Validators.max(3)]],
      manufacturerId: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.gndrservice.getAll().subscribe({
      next: (apidata: GenderReadOnlyDTO[]) => {
        this.genders = apidata;
        console.log(apidata);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('API completed');
      },
    });

    this.subscription = this.tpservice.getAll().subscribe({
      next: (apidata: TypeReadOnlyDTO[]) => {
        this.types = apidata;
        console.log(apidata);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('API completed');
      },
    });
    this.subscription = this.mnfrservice.getAll().subscribe({
      next: (apidata: ManufacturerReadOnlyDTO[]) => {
        this.mnfrs = apidata;
        console.log(apidata);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('API completed');
      },
    });

    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.model = this.route.snapshot.paramMap.get('model');
    this.genderId = Number(this.route.snapshot.paramMap.get('genderId'));
    this.genderDescription =
      this.route.snapshot.paramMap.get('genderDescription');
    this.manufacturerId = Number(
      this.route.snapshot.paramMap.get('manufacturerId')
    );
    this.manufacturerName =
      this.route.snapshot.paramMap.get('manufacturerName');
    this.typeId = Number(this.route.snapshot.paramMap.get('typeId'));
    this.typeDescription = this.route.snapshot.paramMap.get('typeDescription');
    this.oldDescription = this.route.snapshot.paramMap.get('description');
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);

      if (this.productId != undefined) {
        const prdId = this.productId;
        const product = this.form.value as ProductUpdateDTO;
        this.subscription = this.service
          .updateProduct(product, prdId)
          .subscribe((response) => {
            console.log(response);
            this.router.navigate([`product/list`]);
          });
      }
      
    } else {
      console.log('Form is not valid!');
    }
  }
}
