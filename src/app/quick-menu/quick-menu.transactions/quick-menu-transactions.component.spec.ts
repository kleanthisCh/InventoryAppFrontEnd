import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMenuTransactionsComponent } from './quick-menu-transactions.component';

describe('QuickMenuTransactionsComponent', () => {
  let component: QuickMenuTransactionsComponent;
  let fixture: ComponentFixture<QuickMenuTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickMenuTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickMenuTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
