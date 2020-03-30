import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string = 'new user';
  notifications = [];

  constructor(private notifierSvc: NotifierService) { }

  dismissNotification(notificationId: number) {
    console.log("Dismissing notificationId '" + notificationId + "'");
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  ngOnInit(): void {
    this.notifierSvc.notifications$.subscribe(notif => {
      console.log("Received notification: " + notif)
      this.notifications.push(notif)
    });
  }
}