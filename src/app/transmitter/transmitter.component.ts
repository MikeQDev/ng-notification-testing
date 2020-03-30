import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from '../notifier.service';
import { MyNotification } from '../my-notification';

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

  constructor(private fb: FormBuilder, private notifierService: NotifierService) {
    this.notifierService.notifications$.subscribe(last => {
      if (last.id > this.latestNotificationId) {
        this.latestNotificationId = last.id;
      }
    });
  }

  sendNotification() {
    this.notifierService.sendNotification(new MyNotification(++this.latestNotificationId,
      this.noticationForm.value.notificationTitle, this.noticationForm.value.notificationMessage));
  }

  ngOnInit(): void {
  }

}
