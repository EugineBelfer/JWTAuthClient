import { AuthClientPassportJWTPage } from './app.po';

describe('auth-client-passport-jwt App', () => {
  let page: AuthClientPassportJWTPage;

  beforeEach(() => {
    page = new AuthClientPassportJWTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
