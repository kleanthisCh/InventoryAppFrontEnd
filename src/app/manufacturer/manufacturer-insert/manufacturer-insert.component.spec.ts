import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerInsertComponent } from './manufacturer-insert.component';

describe('ManufacturerInsertComponent', () => {
  let component: ManufacturerInsertComponent;
  let fixture: ComponentFixture<ManufacturerInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
