import { Injectable, OnInit } from '@angular/core';
import { Subject, of, ReplaySubject } from 'rxjs';
import { MyNotification } from './my-notification';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private baseNotifications = [new MyNotification(1, 'someTitle1', 'someMessage1'), new MyNotification(2, 'someTitle2', 'someMessage2'), new MyNotification(3, 'someTitle3', 'someMessage3')];

  private notificationsSource = new ReplaySubject<MyNotification>();
  notifications$ = this.notificationsSource.asObservable();

  sendNotification(notification: MyNotification) {
    this.notificationsSource.next(notification);
    console.log("notifier.service - Sent notification: " + JSON.stringify(notification))
  }

  constructor() {
    this.baseNotifications.forEach(baseNotification =>
      this.sendNotification(baseNotification)
    )
  }
}
