import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  private notyf = new Notyf();

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  signup() {
    if (this.email === '') {
      this.notyf.error('Please enter email');
      return;
    }

    if (this.password === '') {
      this.notyf.error('Please enter password');
      return;
    }

    this.auth.register(this.email, this.password);
  }
}
