import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerUpdateSpecificComponent } from './manufacturer-update-specific.component';

describe('ManufacturerUpdateSpecificComponent', () => {
  let component: ManufacturerUpdateSpecificComponent;
  let fixture: ComponentFixture<ManufacturerUpdateSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerUpdateSpecificComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerUpdateSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
