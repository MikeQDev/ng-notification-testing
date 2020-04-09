import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  userName = "USER_NOT_LOGGED_IN";

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string): Observable<boolean> {
    this.userName = username;
    console.log("Logging in as " + this.userName)
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    console.log("Logging out " + this.userName);
    this.userName = "USER_NOT_LOGGED_IN";
    this.isLoggedIn = false;
  }

  constructor() { }
}
