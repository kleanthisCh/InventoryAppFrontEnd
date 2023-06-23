import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderCreateDTO } from '../gender.interfaces';
import { GenderService } from '../gender.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gender-insert',
  templateUrl: './gender-insert.component.html',
  styleUrls: ['./gender-insert.component.css'],
})
export class GenderInsertComponent implements OnDestroy {
  form:FormGroup
  subscription: Subscription | undefined;
  constructor(private fbg: FormBuilder, private service: GenderService) {
    this.form = this.fbg.group({
      genderDescription: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const gender = this.form.value as GenderCreateDTO;

      this.subscription = this.service
        .insertGender(gender)
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      console.log('Form is not valid!');
    }
  }
}
