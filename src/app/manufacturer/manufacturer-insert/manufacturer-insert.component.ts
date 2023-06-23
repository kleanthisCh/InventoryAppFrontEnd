import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManufacturerCreateDTO } from '../manufacturer.interfaces';
import { ManufacturerService } from '../manufacturer.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-manufacturer-insert',
  templateUrl: './manufacturer-insert.component.html',
  styleUrls: ['./manufacturer-insert.component.css'],
})
export class ManufacturerInsertComponent implements OnDestroy {
  form: FormGroup;
  subscription: Subscription | undefined;
  constructor(private fb: FormBuilder, private service: ManufacturerService) {
    this.form = this.fb.group({
      manufacturername: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const manufacturer = this.form.value as ManufacturerCreateDTO;
      this.service.insertManufacturer(manufacturer).subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log('Form is not valid!');
    }
  }
}
