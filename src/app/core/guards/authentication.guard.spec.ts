// src\app\core\guards\authentication.guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '@angular/fire/auth'; // Import the User type

describe('authenticationGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    // Create spies for AuthService and Router
    mockAuthService = jasmine.createSpyObj('AuthService', ['waitForAuthState']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Create mock objects for ActivatedRouteSnapshot and RouterStateSnapshot
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access if the user is logged in', async () => {
    // Mock the AuthService to return a logged-in user
    const mockUser: User = {
      uid: '123',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: 'mock-refresh-token',
      tenantId: null,
      delete: jasmine.createSpy('delete'),
      getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mock-id-token')),
      getIdTokenResult: jasmine.createSpy('getIdTokenResult').and.returnValue(Promise.resolve({})),
      reload: jasmine.createSpy('reload'),
      toJSON: jasmine.createSpy('toJSON').and.returnValue({}),
      displayName: null,
      email: null,
      phoneNumber: null,
      photoURL: null,
      providerId: '',
    };
    mockAuthService.waitForAuthState.and.returnValue(Promise.resolve(mockUser));

    // Execute the guard in an injection context
    const result = await TestBed.runInInjectionContext(() => authenticationGuard(mockRoute, mockState));

    // Assertions
    expect(result).toBeTrue(); // Access should be granted
    expect(mockRouter.navigate).not.toHaveBeenCalled(); // No redirection should occur
  });

  it('should block access and redirect to the default route if the user is not logged in', async () => {
    // Mock the AuthService to return null (user not logged in)
    mockAuthService.waitForAuthState.and.returnValue(Promise.resolve(null));

    // Execute the guard in an injection context
    const result = await TestBed.runInInjectionContext(() => authenticationGuard(mockRoute, mockState));

    // Assertions
    expect(result).toBeFalse(); // Access should be blocked
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']); // Redirect to the default route
  });

  it('should block access and redirect to the error page if an error occurs', async () => {
    // Mock the AuthService to throw an error
    const error = new Error('Firebase error');
    mockAuthService.waitForAuthState.and.returnValue(Promise.reject(error));

    // Execute the guard in an injection context
    const result = await TestBed.runInInjectionContext(() => authenticationGuard(mockRoute, mockState));

    // Assertions
    expect(result).toBeFalse(); // Access should be blocked
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error']); // Redirect to the error page
  });
});
