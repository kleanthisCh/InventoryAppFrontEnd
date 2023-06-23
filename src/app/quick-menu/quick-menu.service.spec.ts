import { TestBed } from '@angular/core/testing';

import { QuickMenuService } from './quick-menu.service';

describe('QuickMenuService', () => {
  let service: QuickMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
