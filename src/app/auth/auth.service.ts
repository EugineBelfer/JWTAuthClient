import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Http} from '@angular/http';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  authUrl = 'http://localhost:5000/users/auth';
  refreshAccessTokenUrl = 'http://localhost:5000/users/token';
  logoutUrl = 'http://localhost:5000/users/token/reject';
  refreshToken;

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  refreshAccessToken() {
    this.refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(this.refreshAccessTokenUrl, {'refreshToken': this.refreshToken})
      .map(res => res.json());
  }

  login(credentials) {
    return this.http.post(this.authUrl, credentials)
      .map(res => res.json());
  }

  logout() {
    this.refreshToken = localStorage.getItem('refreshToken');
    localStorage.clear();
    return this.http.post(this.logoutUrl, {'refreshToken': this.refreshToken})
      .map(res => res.json()).subscribe();
  }

  getSecretRoute() {

  }

}
