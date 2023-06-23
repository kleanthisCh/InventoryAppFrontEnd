import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCreateDTO, ProductReadOnlyDTO } from '../product.interfaces';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { GenderService } from 'src/app/gender/gender.service';
import { GenderReadOnlyDTO } from 'src/app/gender/gender.interfaces';
import { TypeReadOnlyDTO } from 'src/app/type/type.interfaces';
import { TypeService } from 'src/app/type/type.service';
import { ManufacturerReadOnlyDTO } from 'src/app/manufacturer/manufacturer.interfaces';
import { ManufacturerService } from 'src/app/manufacturer/manufacturer.service';
import { BarcodeCreateDTO } from 'src/app/barcode/barcode.interfaces';
import { BarcodeService } from 'src/app/barcode/barcode.service';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
})
export class ProductInsertComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formbcr: FormGroup;
  subscription: Subscription | undefined;
  genders: GenderReadOnlyDTO[] = [];
  types: TypeReadOnlyDTO[] = [];
  mnfrs: ManufacturerReadOnlyDTO[] = [];
  products: ProductReadOnlyDTO[] = [];
  constructor(
    private fb: FormBuilder,
    private fbg: FormBuilder,
    private service: ProductService,
    private gndrservice: GenderService,
    private tpservice: TypeService,
    private mnfrservice: ManufacturerService,
    private bcrservice: BarcodeService
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

    this.formbcr = this.fbg.group({
      barcodeId: ['', [Validators.required, Validators.minLength(2)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      size: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      model: ['', [Validators.required]],
    });
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
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const product = this.form.value as ProductCreateDTO;

      this.subscription = this.service
        .insertProduct(product)
        .subscribe((response) => {
          this.subscription = this.service.getAll().subscribe({
            next: (apidata: ProductReadOnlyDTO[]) => {
              this.products = apidata;
              console.log(apidata);
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              console.log('API completed');
              const modelFound = this.form.value.model;
              console.log('modelFound = ' + modelFound);
              if (modelFound !== null) {
                this.formbcr.controls['model'].setValue(modelFound);
                this.formbcr.value.model = modelFound;
                this.formbcr.controls['model'].disable();
              }

              const prdIdFound = this.products
                .filter((e) => (e.model == modelFound ? e.productId : ''))
                .at(0)?.productId;
              console.log('prdIdFound = ' + prdIdFound);
              if (prdIdFound !== undefined) {
                this.formbcr.controls['productId'].setValue(prdIdFound);
                this.formbcr.value.productId = prdIdFound;
                this.formbcr.controls['productId'].disable();
              }
            },
          });
        });
    } else {
      console.log('Form is not valid!');
    }
  }

  onSubmitbcr(): void {
    this.formbcr.controls['model'].enable();
    this.formbcr.controls['productId'].enable();
    console.log(this.formbcr.value);
    if (this.formbcr.valid) {
      console.log(this.formbcr.value);
      const barcode = this.formbcr.value as BarcodeCreateDTO;
      this.ngOnDestroy();
      this.subscription = this.bcrservice
        .insertBarcode(barcode)
        .subscribe((response) => {
          this.formbcr.controls['model'].disable();
          this.formbcr.controls['productId'].disable();
          this.formbcr.controls['barcodeId'].reset();
          this.formbcr.controls['size'].reset();
          this.formbcr.controls['quantity'].reset();
        });
    } else {
      console.log('Form is not valid!');
    }
  }
}
