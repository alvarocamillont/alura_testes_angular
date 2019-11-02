import { inject, TestBed } from '@angular/core/testing';

import { TokenService } from '../token/token.service';
import { UserService } from './user.service';

class MockTokenService {
  token = '';

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  removeToken() {
    this.token = '';
  }
}

fdescribe('O serviço UserService', () => {
  let userService: UserService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: TokenService,
          useClass: MockTokenService
        }
      ]
    });

    tokenService = TestBed.get(TokenService);
    userService = TestBed.get(UserService);
  });

  it('de ver criado.', inject([UserService], (service: UserService) => {
    tokenService.setToken('a');
    expect(service).toBeTruthy();
  }));

  xit('deve guardar um token', () => {
    const fakeToken = 'teste';
    tokenService.setToken(fakeToken);
    expect(tokenService.hasToken()).toBeTruthy();
    expect(tokenService.getToken()).toBe(fakeToken);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
