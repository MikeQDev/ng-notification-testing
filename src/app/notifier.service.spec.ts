import { TestBed } from '@angular/core/testing';

import { NotifierService } from './notifier.service';
import { MyNotification } from './my-notification';
import { JsonPipe } from '@angular/common';
import { first, take, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

describe('NotifierService', () => {
  let service: NotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NotifierService] });
    service = TestBed.inject(NotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send and receieve new notification', (done: DoneFn) => {
    let sampleNotification: MyNotification = new MyNotification(0, 'someTitle', 'someMessage');

    service.notifications$.pipe(skip(3)).subscribe(value => {
      console.log("RECVD:" + JSON.stringify(value));
      expect(value).toEqual(sampleNotification);
      done();
    });

    service.sendNotification(sampleNotification);
  });

  it('should send and receieve second notification on init', (done: DoneFn) => {
    let sampleNotification: MyNotification = new MyNotification(2, 'someTitle2', 'someMessage2');

    let second$: Observable<MyNotification> = service.notifications$.pipe(
      first(ev => ev.id === 2)
    );

    second$.subscribe(value => {
      console.log("RECVD:" + JSON.stringify(value));
      expect(value).toEqual(sampleNotification); // using .toBe to check fails here?
      done();
    });
  });

  it('should send` and receieve new notifications on init', (done: DoneFn) => {
    let sampleNotification: MyNotification = new MyNotification(1, 'someTitle1', 'someMessage1');

    let first$: Observable<MyNotification> = service.notifications$.pipe(
      take(1)
    );

    first$.subscribe(value => {
      console.log("RECVD:" + JSON.stringify(value));
      expect(value).toEqual(sampleNotification); // using .toBe to check fails here?
      done();
    });
  });
});
