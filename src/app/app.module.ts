import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TransmitterComponent } from './transmitter/transmitter.component';

import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomReuseStrategy } from './custom-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TransmitterComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
