import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.userEmail$ = this.authService.getUserEmail();
  }

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
