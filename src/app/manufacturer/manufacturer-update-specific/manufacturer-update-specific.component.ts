import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManufacturerUpdateDTO } from '../manufacturer.interfaces';
import { ManufacturerService } from '../manufacturer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manufacturer-update-specific',
  templateUrl: './manufacturer-update-specific.component.html',
  styleUrls: ['./manufacturer-update-specific.component.css'],
})
export class ManufacturerUpdateSpecificComponent implements OnInit, OnDestroy {
  [x: string]: any;
  manufacturerId: number | undefined;
  oldName: string | null = '';
  form: FormGroup;
  subscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ManufacturerService
  ) {
    this.form = this.fb.group({
      manufacturername: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.manufacturerId = Number(this.route.snapshot.paramMap.get('id'));
    this.oldName = this.route.snapshot.paramMap.get('name');
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);

      if (this.manufacturerId != undefined) {
        const mnfrId = this.manufacturerId;
        const manufacturer = this.form.value as ManufacturerUpdateDTO;
        this.subscription = this.service
          .updateManufacturer(manufacturer, mnfrId)
          .subscribe((response) => {
            console.log(response);
            this.router.navigate([`manufacturer/list`]);
          });
      }
    } else {
      console.log('Form is not valid!');
    }
  }
}
