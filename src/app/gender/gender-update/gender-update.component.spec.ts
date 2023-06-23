import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderUpdateComponent } from './gender-update.component';

describe('GenderUpdateComponent', () => {
  let component: GenderUpdateComponent;
  let fixture: ComponentFixture<GenderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
