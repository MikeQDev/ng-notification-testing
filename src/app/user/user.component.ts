import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../notifier.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string = 'UNKNOWN_USER';
  notifications = [];

  constructor(private notifierSvc: NotifierService, private authSvc: AuthService) { }

  dismissNotification(notificationId: number) {
    console.log("Dismissing notificationId '" + notificationId + "'");
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  ngOnInit(): void {
    this.userName = this.authSvc.userName;
    this.notifierSvc.notifications$.subscribe(notif => {
      console.log("Received notification: " + JSON.stringify(notif))
      this.notifications.push(notif)
    });
  }
}