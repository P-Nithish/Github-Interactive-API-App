import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthGuard } from './auth.guard';
import { Observable, BehaviorSubject } from 'rxjs';

class MockAngularFireAuth {
  private authStateSubject = new BehaviorSubject<any>(null);

  get authState(): Observable<any> {
    return this.authStateSubject.asObservable();
  }

  setAuthState(state: any) {
    this.authStateSubject.next(state);
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let fireAuthStub: MockAngularFireAuth;
  let routerStub: Partial<Router>;

  beforeEach(() => {
    fireAuthStub = new MockAngularFireAuth();
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: fireAuthStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to signin if not authenticated', (done) => {
    fireAuthStub.setAuthState(null); 

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/signin']);
      done();
    });
  });

  it('should allow access if authenticated', (done) => {
    fireAuthStub.setAuthState({ uid: 'testUser' });

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });
});
