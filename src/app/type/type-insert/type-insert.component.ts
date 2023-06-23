import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeCreateDTO } from '../type.interfaces';
import { TypeService } from '../type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-insert',
  templateUrl: './type-insert.component.html',
  styleUrls: ['./type-insert.component.css'],
})
export class TypeInsertComponent implements OnDestroy {
  form: FormGroup;
  subscription: Subscription | undefined;
  constructor(private fbg: FormBuilder, private service: TypeService) {
    this.form = this.fbg.group({
      typeDescription: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const type = this.form.value as TypeCreateDTO;

      this.subscription = this.service
        .insertType(type)
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      console.log('Form is not valid!');
    }
  }
}
