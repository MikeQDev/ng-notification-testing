import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { AuthService } from '../auth/auth.service';

/**
 * Shouldn't this use a stub/mock service?
 */
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let welcomeParagraphEl: HTMLParagraphElement;
  let notificationListEl: HTMLUListElement;
  let mockUserName: string = "mockUser";

  let authServiceStub: Partial<AuthService>;

  beforeEach(() => {
    authServiceStub = {
      isLoggedIn: false,
      userName: mockUserName
    };
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
      //providers: [NotifierService]
    })
      .compileComponents();

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
    expect(component.userName).toEqual(component.userName);
    fixture.detectChanges();
    expect(component.userName).toEqual(mockUserName);
    expect(welcomeParagraphEl.querySelector('b').textContent).toEqual(mockUserName);
  });

  it('should have proper amount of notifications', () => {
    expect(component.notifications.length).toEqual(0);
    fixture.detectChanges(); // ngOnInit()
    expect(component.notifications.length).toEqual(3);
  });

  it('should display welcome <username> with notification count', () => {
    expect(welcomeParagraphEl.textContent).toEqual("Welcome, ");
    fixture.detectChanges();
    expect(welcomeParagraphEl.textContent).toEqual("Welcome, " + mockUserName + ". You have 3 notifications:");
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
