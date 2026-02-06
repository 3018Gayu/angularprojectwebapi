import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account';

export const authGuard = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/account/login']);
  return false;
};
