import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BarcodeUpdateDTO } from '../../barcode/barcode.interfaces';
import { QuickMenuService } from '../quick-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quick-menu-transactions',
  templateUrl: './quick-menu-transactions.component.html',
  styleUrls: ['./quick-menu-transactions.component.css'],
})
export class QuickMenuTransactionsComponent implements OnInit, OnDestroy {
  formAdd: FormGroup;
  formSub: FormGroup;
  subscription: Subscription | undefined;
  constructor(
    private fbAdd: FormBuilder,
    private fbSub: FormBuilder,
    private service: QuickMenuService
  ) {
    this.formAdd = this.fbAdd.group({
      barcodeAdd: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.formSub = this.fbSub.group({
      barcodeSub: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {}

  onSubmitAdd(): void {
    console.log(this.formAdd.value);
    if (this.formAdd.valid) {
      console.log(this.formAdd.value);
      this.subscription = this.service
        .AddOne(this.formAdd.value.barcodeAdd)
        .subscribe((response) => {
          console.log(response);
        });
      this.formAdd.reset();
    } else {
      console.log('Form is not valid!');
    }
  }

  onSubmitSub(): void {
    console.log(this.formSub.value.barcodeSub);
    if (this.formSub.valid) {
      console.log(this.formSub.value);
      this.subscription = this.service
        .SubOne(this.formSub.value.barcodeSub)
        .subscribe((response) => {
          console.log(response);
        });
      this.formSub.reset();
    } else {
      console.log('Form is not valid!');
    }
  }
}
