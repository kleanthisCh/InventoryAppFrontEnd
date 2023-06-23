import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeUpdateDTO } from '../barcode.interfaces';
import { BarcodeService } from '../barcode.service';
import { ProductService } from 'src/app/product/product.service';
import { Subscription } from 'rxjs';
import { ProductReadOnlyDTO } from 'src/app/product/product.interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-barcode-update-specific',
  templateUrl: './barcode-update-specific.component.html',
  styleUrls: ['./barcode-update-specific.component.css'],
})
export class BarcodeUpdateSpecificComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription | undefined;
  products: ProductReadOnlyDTO[] = [];

  barcodeId: string | null = '';
  model: string | null = '';
  productId: number | undefined;
  size: string | null = '';
  quantity: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

    this.barcodeId = this.route.snapshot.paramMap.get('barcodeId');
    this.model = this.route.snapshot.paramMap.get('model');
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.size = this.route.snapshot.paramMap.get('size');
    this.quantity = Number(this.route.snapshot.paramMap.get('quantity'));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.form.value);
    const barcode = this.form.value as BarcodeUpdateDTO;
    const modelFound = this.products
      .filter((e) => (e.productId == barcode.productId ? e.model : ''))
      .at(0)?.model;
    if (modelFound !== undefined) {
      barcode.model = modelFound;
    }

    if (this.form.valid) {
      console.log(this.form.value);
      if (this.barcodeId !== null) {
        const bcrId = this.barcodeId;
        this.subscription = this.service
          .updateBarcode(barcode, bcrId)
          .subscribe((response) => {
            console.log(response);
            this.router.navigate([`barcode/list`]);
          });
      }
      
    } else {
      console.log('Form is not valid!');
    }
  }
}
