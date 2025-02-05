import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { loginGuard } from './guards/login.guard';
import { UserListComponent } from './components/control-panel/user-list/user-list.component';
import { DetailsUserComponent } from './components/control-panel/user-list/details-user/details-user.component';
import { DetailsSchoolComponent } from './components/control-panel/school-list/details-school/details-school.component';
import { SchoolListComponent } from './components/control-panel/school-list/school-list.component';
import { EditUserComponent } from './components/control-panel/user-list/edit-user/edit-user.component';
import { CreateUserComponent } from './components/control-panel/user-list/create-user/create-user.component';
import { MeetingDetailComponent } from './components/home/meeting-detail/meeting-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'signup', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'meeting-detail/:id', component: MeetingDetailComponent, canActivate: [authGuard]},
  { path: 'panel-control', component: ControlPanelComponent, canActivate: [authGuard], data: { roles: [1, 2] }, // Solo tipo_id 1 (god) y tipo_id 2 (admin) pueden acceder
    // children: [
    //   // Rutas anidadas bajo panel-control

    //    // Detalles de escuela
    // ],
  },
  { path: 'users', component: UserListComponent , canActivate: [authGuard], data: { roles: [1, 2] }}, // Detalles de usuario
  { path: 'user/:id', component: DetailsUserComponent , canActivate: [authGuard], data: { roles: [1, 2] }}, // Detalles de usuario
  { path: 'edit-user/:id', component: EditUserComponent , canActivate: [authGuard], data: { roles: [1, 2] }},
  { path: 'users/create', component: CreateUserComponent, canActivate: [authGuard], data: { roles: [1, 2] }},

  { path: 'schools', component: SchoolListComponent, canActivate: [authGuard], data: { roles: [1, 2] } }, // Detalles de escuela
  { path: 'school/:id', component: DetailsSchoolComponent, canActivate: [authGuard], data: { roles: [1, 2] }},
];
