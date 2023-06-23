import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdateSpecificComponent } from './product-update-specific.component';

describe('ProductUpdateSpecificComponent', () => {
  let component: ProductUpdateSpecificComponent;
  let fixture: ComponentFixture<ProductUpdateSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUpdateSpecificComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUpdateSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
