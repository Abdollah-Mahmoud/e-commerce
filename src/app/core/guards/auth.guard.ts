import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if running in the browser before accessing localStorage
  const isBrowser =
    typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (isBrowser && localStorage?.getItem('token') !== null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
