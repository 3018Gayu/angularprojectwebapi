import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    // ✅ Run the guard inside Angular's injection context
    const result = TestBed.runInInjectionContext(() => authGuard());
    expect(result).toBeDefined();
  });
});
