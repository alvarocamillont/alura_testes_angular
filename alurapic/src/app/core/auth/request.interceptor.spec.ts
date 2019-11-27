import { TestBed } from '@angular/core/testing';

import { HttpClient, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestInterceptor } from './request.interceptor';
import { TokenService } from '../token/token.service';

describe('O interceptor RequestInterceptor', () => {
  let service: RequestInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RequestInterceptor,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        }
      ]
    });
    service = TestBed.get(RequestInterceptor);
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    tokenService = TestBed.get(TokenService);
  });

  it('deve ser instaciada', () => {
    expect(service).toBeTruthy();
  });

  describe('ao fazer requisições http', () => {
    it('adiciona o token no header da requisição', () => {
      spyOn(tokenService, 'hasToken').and.returnValue(true);
      spyOn(tokenService, 'getToken').and.returnValue('teste');

      http.get('/data').subscribe((response: HttpResponse<any>) => {
        expect(response.headers.get('x-access-token')).toBe('teste');
      });

      const req = httpMock.expectOne(
        r => r.url === '/data'
      );

      expect(req.request.method).toEqual('GET');

      req.flush({ hello: 'world' });
    });

    it('não adiciona o token quando usuário não realizou o login', () => {
      spyOn(tokenService, 'hasToken').and.returnValue(false);

      http.get('/data').subscribe((response: HttpResponse<any>) => {
        expect(response.headers).toBeUndefined();
      });

      const req = httpMock.expectOne(
        r => r.url === '/data'
      );
      expect(req.request.method).toEqual('GET');

      req.flush({ hello: 'world' });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
