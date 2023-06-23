import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeUpdateComponent } from './barcode-update.component';

describe('BarcodeUpdateComponent', () => {
  let component: BarcodeUpdateComponent;
  let fixture: ComponentFixture<BarcodeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
