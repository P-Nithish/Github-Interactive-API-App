import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  private notyf = new Notyf();

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  signin() {
    if (this.email === '') {
      this.notyf.error('Please enter email');
      return;
    }

    if (this.password === '') {
      this.notyf.error('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);
  }
}
