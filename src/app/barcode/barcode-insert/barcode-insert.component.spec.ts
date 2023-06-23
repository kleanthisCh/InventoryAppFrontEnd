import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeInsertComponent } from './barcode-insert.component';

describe('BarcodeInsertComponent', () => {
  let component: BarcodeInsertComponent;
  let fixture: ComponentFixture<BarcodeInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
