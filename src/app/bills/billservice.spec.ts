import { TestBed } from '@angular/core/testing';

import { Billservice } from './billservice';

describe('Billservice', () => {
  let service: Billservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Billservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
