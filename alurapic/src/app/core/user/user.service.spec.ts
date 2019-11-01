import { inject, TestBed } from '@angular/core/testing';

import { TokenService } from '../token/token.service';
import { UserService } from './user.service';

describe('O serviço UserService', () => {
  let userService: UserService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, TokenService]
    });

    tokenService = TestBed.get(TokenService);
    userService = TestBed.get(UserService);
  });

  it('de ver criado.', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('deve guardar um token', () => {
    const fakeToken = 'teste';
    tokenService.setToken(fakeToken);
    expect(tokenService.hasToken()).toBeTruthy();
    expect(tokenService.getToken()).toBe(fakeToken);
  });
});
