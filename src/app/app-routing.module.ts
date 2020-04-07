import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { TransmitterComponent } from './transmitter/transmitter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  {
    path: 'compose',
    outlet: 'popup',
    component: TransmitterComponent,
    // canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    // canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: UserComponent,
    // canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', component: PageNotFoundComponent }
]



@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
