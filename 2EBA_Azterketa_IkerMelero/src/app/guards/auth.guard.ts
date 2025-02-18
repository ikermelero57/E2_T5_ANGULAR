import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar si la ruta tiene restricción de roles (ejemplo: panel-control)
  // const requiredRoles = route.data?.['roles'] as number[] | undefined;
  // if (requiredRoles && !requiredRoles.includes(user.tipo_id)) {
  //   router.navigate(['/home']); // Redirigir si el usuario no tiene permisos
  //   return false;
  // }

  return true;
}
