import { TestBed } from '@angular/core/testing';

import { InventoryTransactionservice } from './inventory-transactionservice';

describe('InventoryTransactionservice', () => {
  let service: InventoryTransactionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryTransactionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
