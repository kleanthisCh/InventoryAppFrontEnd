import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeUpdateSpecificComponent } from './barcode-update-specific.component';

describe('BarcodeUpdateSpecificComponent', () => {
  let component: BarcodeUpdateSpecificComponent;
  let fixture: ComponentFixture<BarcodeUpdateSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeUpdateSpecificComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeUpdateSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
