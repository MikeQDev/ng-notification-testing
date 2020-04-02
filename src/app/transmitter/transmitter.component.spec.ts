import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitterComponent } from './transmitter.component';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('TransmitterComponent', () => {
  let component: TransmitterComponent;
  let fixture: ComponentFixture<TransmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransmitterComponent],
      providers: [FormBuilder],
      imports: [RouterTestingModule
        /*.withRoutes([{ path: 'composed', component: TransmitterComponent, outlet: 'popup' }])*/
      ]
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

  it('should track latestNotificationId #', () => {
    fixture.detectChanges();
    expect(component.nextNotificationId).toEqual(4);
    component.sendNotification();
    expect(component.nextNotificationId).toEqual(5);
    component.sendNotification();
    expect(component.nextNotificationId).toEqual(6);
  });
});
