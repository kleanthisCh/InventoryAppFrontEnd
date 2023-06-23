import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerUpdateComponent } from './manufacturer-update.component';

describe('ManufacturerUpdateComponent', () => {
  let component: ManufacturerUpdateComponent;
  let fixture: ComponentFixture<ManufacturerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
