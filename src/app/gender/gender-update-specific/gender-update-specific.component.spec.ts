import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderUpdateSpecificComponent } from './gender-update-specific.component';

describe('GenderUpdateSpecificComponent', () => {
  let component: GenderUpdateSpecificComponent;
  let fixture: ComponentFixture<GenderUpdateSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderUpdateSpecificComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderUpdateSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
