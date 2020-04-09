import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  loginUserName: string = "xyz";

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = (this.authService.isLoggedIn ? 'Logged in as ' + this.loginUserName : 'Logged out');
  }

  login() {
    this.message = 'Trying to log in as ' + this.loginUserName + '...';

    this.authService.login(this.loginUserName).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/user';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.authService.logout();
    this.setMessage();
  }


}
