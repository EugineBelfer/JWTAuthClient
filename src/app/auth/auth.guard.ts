import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  refreshToken;

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(next, target) {
    this.refreshToken = localStorage.getItem('refreshToken');

    if (this.auth.loggedIn()) {
      return true;
    } else if (this.refreshToken) {
      this.auth.refreshAccessToken().subscribe(data => {
        if (data.success) {
          console.log('Token has been refreshed!');
          console.log(data);
          localStorage.setItem('id_token', data.token.accessToken);
          localStorage.setItem('refreshToken', data.token.refreshToken);
          this.router.navigateByUrl(target.url);
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      });
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }


  }
}
