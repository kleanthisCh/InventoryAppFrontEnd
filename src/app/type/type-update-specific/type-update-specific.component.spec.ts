import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUpdateSpecificComponent } from './type-update-specific.component';

describe('TypeUpdateSpecificComponent', () => {
  let component: TypeUpdateSpecificComponent;
  let fixture: ComponentFixture<TypeUpdateSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeUpdateSpecificComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeUpdateSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
