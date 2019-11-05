import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('O serviço AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, UserService]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('no método authenticate, deve autenticar o usuário no sistema com a senha correta.', () => {
    const fakeAuth = 'testeToken';
    authService.authenticate('alvaro', '123456').subscribe((response) => {
      expect(response).toEqual(fakeAuth);
    });

    const req = httpMock.expectOne(
      (request) => request.method === 'POST' && request.url === TOKEN_ENDPOINT
    );
    expect(req.request.method).toBe('POST');

    req.flush(fakeUserInfo);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
