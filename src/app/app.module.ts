import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AuthGuard} from './auth/auth.guard';
import {MyAccountComponent} from './my-account/my-account.component';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth/auth.service';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

export const routes = [
  {path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent}
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    SearchComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [RouterModule.forRoot(routes)]
  ],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  },
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
