import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deliveryOwnerGuard } from './delivery-owner.guard';

describe('deliveryOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deliveryOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
