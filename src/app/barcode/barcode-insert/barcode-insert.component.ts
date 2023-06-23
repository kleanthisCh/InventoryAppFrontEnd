import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeCreateDTO } from '../barcode.interfaces';
import { BarcodeService } from '../barcode.service';
import { ProductService } from 'src/app/product/product.service';
import { Subscription } from 'rxjs';
import { ProductReadOnlyDTO } from 'src/app/product/product.interfaces';

@Component({
  selector: 'app-barcode-insert',
  templateUrl: './barcode-insert.component.html',
  styleUrls: ['./barcode-insert.component.css'],
})
export class BarcodeInsertComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription | undefined;
  products: ProductReadOnlyDTO[] = [];
  constructor(
    private fbg: FormBuilder,
    private service: BarcodeService,
    private prdService: ProductService
  ) {
    this.form = this.fbg.group({
      barcodeId: ['', [Validators.required, Validators.minLength(2)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      size: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      model: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.subscription = this.prdService.getAll().subscribe({
      next: (apidata: ProductReadOnlyDTO[]) => {
        this.products = apidata;
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
    console.log(this.form.value);
    const barcode = this.form.value as BarcodeCreateDTO;
    const modelFound = this.products
      .filter((e) => (e.productId == barcode.productId ? e.model : ''))
      .at(0)?.model;
    if (modelFound !== undefined) {
      barcode.model = modelFound;
    }

    if (this.form.valid) {
      console.log(this.form.value);
      const barcode = this.form.value as BarcodeCreateDTO;

      this.subscription = this.service
        .insertBarcode(barcode)
        .subscribe((response) => {
          console.log(response);
        });

      this.clearForm();
    } else {
      console.log('Form is not valid!');
    }
  }

  clearForm() {
    this.form.controls['quantity'].reset();
    this.form.controls['size'].reset();
    this.form.controls['barcodeId'].reset();
  }
}
