import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderInsertComponent } from './gender-insert.component';

describe('GenderInsertComponent', () => {
  let component: GenderInsertComponent;
  let fixture: ComponentFixture<GenderInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
