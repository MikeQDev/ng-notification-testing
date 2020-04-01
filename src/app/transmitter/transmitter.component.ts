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
  noticationForm = this.fb.group({
    notificationId: ['a', Validators.required],
    notificationTitle: ['b', Validators.required],
    notificationMessage: ['c', Validators.required]
  })
  latestNotificationId: number = -1;

  constructor(private fb: FormBuilder, private notifierService: NotifierService, private router: Router) { }

  sendNotification() {
    this.notifierService.sendNotification(new MyNotification(++this.latestNotificationId,
      this.noticationForm.value.notificationTitle, this.noticationForm.value.notificationMessage));
  }

  ngOnInit(): void {
    console.log(this.latestNotificationId)
    this.notifierService.notifications$.subscribe(last => {
      if (last.id > this.latestNotificationId) {
        this.latestNotificationId = last.id;
      }
    });
  }

  close(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    //todo: don't destroy on close? instead, retain state?
  }

}
