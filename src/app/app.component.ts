import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notification-example';

  hasRouteActive(routePath: string): boolean {
    return window.location.pathname.includes(routePath);
  }
}
