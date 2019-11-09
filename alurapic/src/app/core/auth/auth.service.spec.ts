import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const API_URL = environment.ApiURL;

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

  it('deve ser instaciada', () => {
    expect(authService).toBeTruthy();
  });

  describe('no método authenticate', () => {
    it('deve validar o usuário no sistema com a senha correta.', () => {
      const fakeAuth = {
        id: 1,
        name: 'flavio',
        email: 'flavio@alurapic.com.br'
      };
      const spyUser = spyOn(userService, 'setToken').and.returnValue(null);
      let authToken: string;

      authService.authenticate('alvaro', '123456').subscribe((response) => {
        authToken = response.headers.get('x-access-token');
        expect(response.body).toEqual(fakeAuth);
        expect(authToken).toBe('tokentest');
        expect(spyUser).toHaveBeenCalledWith(authToken);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.method === 'POST' && request.url === `${API_URL}/user/login`
      );
      expect(req.request.method).toBe('POST');

      req.flush(fakeAuth, {
        headers: { 'x-access-token': 'tokentest' },
        status: 200,
        statusText: 'OK'
      });
    });
    afterEach(() => {
      httpMock.verify();
    });
  });
});
