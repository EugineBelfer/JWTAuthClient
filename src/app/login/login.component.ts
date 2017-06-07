import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogin(credentials) {
    console.log(credentials);
    this.auth.login(credentials).subscribe(
      data => {
        if (data.success) {
          this.errorMessage = '';
          localStorage.setItem('id_token', data.token.accessToken);
          localStorage.setItem('refreshToken', data.token.refreshToken);
          this.router.navigate(['/myAccount']);
        } else {
          this.errorMessage = data.message;
        }
      },
      error => console.log(error)
    );
  }
}
