import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenderUpdateDTO } from '../gender.interfaces';
import { GenderService } from '../gender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gender-update-specific',
  templateUrl: './gender-update-specific.component.html',
  styleUrls: ['./gender-update-specific.component.css'],
})
export class GenderUpdateSpecificComponent implements OnInit, OnDestroy {
  genderId: number | undefined;
  oldDescription: string | null = '';
  form: FormGroup;
  subscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: GenderService
  ) {
    this.form = this.fb.group({
      genderDescription: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.genderId = Number(this.route.snapshot.paramMap.get('id'));
    this.oldDescription = this.route.snapshot.paramMap.get('description');
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);

      if (this.genderId != undefined) {
        const gndrId = this.genderId;
        const gender = this.form.value as GenderUpdateDTO;
        this.subscription = this.service
          .updateGender(gender, gndrId)
          .subscribe((response) => {
            console.log(response);
            this.router.navigate([`gender/list`]);
          });
      }
    } else {
      console.log('Form is not valid!');
    }
  }
}
