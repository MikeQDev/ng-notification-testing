import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { TransmitterComponent } from './transmitter/transmitter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: TransmitterComponent,
    outlet: 'popup'
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '',
    component: UserComponent
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
