import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
