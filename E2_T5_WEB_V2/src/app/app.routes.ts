import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

  // Bloquea a usuarios autenticados en el login
  { path: 'signup', component: LoginComponent, canActivate: [loginGuard] },

  // Solo tipo_id 1 (god) y tipo_id 2 (admin) pueden acceder
  {
    path: 'panel-control',
    component: ControlPanelComponent,
    canActivate: [authGuard],
    data: { roles: [1, 2] }
  }
];
