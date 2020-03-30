import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitterComponent } from './transmitter.component';
import { FormBuilder } from '@angular/forms';
import { MyNotification } from '../my-notification';

describe('TransmitterComponent', () => {
  let component: TransmitterComponent;
  let fixture: ComponentFixture<TransmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransmitterComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should maintain latestNotificationId #', () => {
    let sampleNotification: MyNotification = new MyNotification(0, 'someTitle', 'someMessage');
    expect(component.latestNotificationId).toEqual(3);
    component.sendNotification();
    expect(component.latestNotificationId).toEqual(4);
    component.sendNotification();
    expect(component.latestNotificationId).toEqual(5);
  });
});
