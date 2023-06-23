import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInsertComponent } from './type-insert.component';

describe('TypeInsertComponent', () => {
  let component: TypeInsertComponent;
  let fixture: ComponentFixture<TypeInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
