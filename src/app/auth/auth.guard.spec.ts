import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let authServiceStub: Partial<AuthService>;

  beforeEach(() => {
    authServiceStub = {
      isLoggedIn: false
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return false when not logged in', () => {
    expect(guard.checkLogin('fakeUrl')).toEqual(false);
  });
  it('should not load when not logged in', () => {
    expect(guard.canLoad(setupTestingRouter.prototype)).toEqual(false);
  });
  it('should return true when logged in', () => {
    authServiceStub.isLoggedIn = true;
    expect(guard.checkLogin('fakeUrl')).toEqual(true);
  });
  it('should load when logged in', () => {
    authServiceStub.isLoggedIn = true;
    expect(guard.canLoad(setupTestingRouter.prototype)).toEqual(true);
  });
});
