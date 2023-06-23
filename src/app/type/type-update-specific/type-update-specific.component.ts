import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeUpdateDTO } from '../type.interfaces';
import { TypeService } from '../type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-update-specific',
  templateUrl: './type-update-specific.component.html',
  styleUrls: ['./type-update-specific.component.css'],
})
export class TypeUpdateSpecificComponent implements OnInit, OnDestroy {
  typeId: number | undefined;
  oldDescription: string | null = '';
  form: FormGroup;
  subscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: TypeService
  ) {
    this.form = this.fb.group({
      typeDescription: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.typeId = Number(this.route.snapshot.paramMap.get('id'));
    this.oldDescription = this.route.snapshot.paramMap.get('description');
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);

      if (this.typeId != undefined) {
        const tpId = this.typeId;
        const type = this.form.value as TypeUpdateDTO;
        this.subscription = this.service
          .updateType(type, tpId)
          .subscribe((response) => {
            console.log(response);
            this.router.navigate([`type/list`]);
          });
      }
    } else {
      console.log('Form is not valid!');
    }
  }
}
