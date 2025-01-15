import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // Lógica de autenticación
    const isAuthenticated = !!localStorage.getItem('user'); // Por ejemplo, verifica si hay un usuario en el almacenamiento local

    if (!isAuthenticated) {
      // Redirige al usuario a la página de registro si no está autenticado
      this.router.navigate(['/signup']);
      return false;
    }
    return true;
  }
}
