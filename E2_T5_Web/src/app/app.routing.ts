import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { GodComponent } from './components/god/god.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ComponentsComponent, canActivate: [AuthGuard] },
  // { path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  // { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  // { path: 'nucleoicons', component: NucleoiconsComponent, canActivate: [AuthGuard] },
  // { path: 'god', component: ComponentsComponent ,canActivate: [AuthGuard]},
  // { path: 'admin', component: ComponentsComponent,canActivate: [AuthGuard]},
  // { path: 'teacher', component: ComponentsComponent,canActivate: [AuthGuard] },
  // { path: 'student', component: ComponentsComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
