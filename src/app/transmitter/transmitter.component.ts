import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from '../notifier.service';
import { MyNotification } from '../my-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transmitter',
  templateUrl: './transmitter.component.html',
  styleUrls: ['./transmitter.component.css']
})
export class TransmitterComponent implements OnInit {
  nextNotificationId: number = -1;
  noticationForm = this.fb.group({
    notificationTitle: ['b', Validators.required],
    notificationMessage: ['c', Validators.required]
  })

  constructor(private fb: FormBuilder, private notifierService: NotifierService, private router: Router) { }

  sendNotification() {
    this.notifierService.sendNotification(new MyNotification(this.nextNotificationId,
      this.noticationForm.value.notificationTitle, this.noticationForm.value.notificationMessage));
  }

  ngOnInit(): void {
    this.notifierService.notifications$.subscribe(last => {
      // if (last.id > this.nextNotificationId) { // this was for lastNotificationId, not nextNotId
      this.nextNotificationId = last.id + 1;
    });
  }

  close(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    //todo: don't destroy on close? instead, retain state?
  }

}
