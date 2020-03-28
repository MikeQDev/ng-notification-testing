import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let welcomeParagraphEl: HTMLParagraphElement;
  let notificationListEl: HTMLUListElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    const nativeElements: HTMLElement = fixture.debugElement.nativeElement;
    welcomeParagraphEl = nativeElements.querySelector('p');
    notificationListEl = nativeElements.querySelector('ul');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper username', () => {
    expect(component.userName).toEqual("new user");
  });

  it('should have proper amount of notifications', () => {
    expect(component.notifications.length).toEqual(3);
  });

  it('should display welcome <username> with notification count', () => {
    expect(welcomeParagraphEl.textContent).toEqual("Welcome, ");
    fixture.detectChanges();
    expect(welcomeParagraphEl.textContent).toEqual("Welcome, new user. You have 3 notifications:");
  });

  it('should display proper amount of li bullet points for each notification', () => {
    expect(notificationListEl.childElementCount).toEqual(0);
    fixture.detectChanges();
    expect(notificationListEl.childElementCount).toEqual(3);
    notificationListEl.childNodes.forEach(notificationBullet => {
      if (notificationBullet.nodeType == Node.TEXT_NODE)
        expect(notificationBullet.textContent).toMatch(/\(\d+\) .* : .* \[X\]/)
    });
  });

  it('should remove notifications on clicking X', () => {
    fixture.detectChanges();
    let notificationDismissSpan: HTMLSpanElement = notificationListEl.children.item(0).querySelector('span');
    notificationDismissSpan.click();
    fixture.detectChanges();
    expect(component.notifications.length).toEqual(2);
    expect(notificationListEl.childElementCount).toEqual(2);
  });
});
