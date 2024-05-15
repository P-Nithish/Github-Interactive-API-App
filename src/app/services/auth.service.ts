import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private notyf = new Notyf();

  private userEmailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userEmail$: Observable<string | null> = this.userEmailSubject.asObservable();

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    // Subscribe to the auth state to update the user email
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.userEmailSubject.next(user.email);
      } else {
        this.userEmailSubject.next(null);
      }
    });
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      this.userEmailSubject.next(email);
      this.router.navigate(['/home']);
      this.notyf.success('Successfully logged in!');
    }).catch(err => {
      this.notyf.error(err.message);
      this.router.navigate(['/signin']);
    });
  }

  getUserEmail(): Observable<string | null> {
    return this.userEmail$;
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      this.notyf.success('Registration Successful');
      this.router.navigate(['/home']);
    }).catch(err => {
      this.notyf.error(err.message);
      this.router.navigate(['/signup']);
    });
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.userEmailSubject.next(null);
      this.router.navigate(['/signin']);
      this.notyf.success('Successfully logged out');
    }).catch(err => {
      this.notyf.error(err.message);
    });
  }
}
