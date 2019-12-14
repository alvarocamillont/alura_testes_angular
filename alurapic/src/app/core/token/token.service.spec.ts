import { TokenService } from './token.service';

describe('O serviço TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve ser criado.', () => {
    expect(tokenService).toBeTruthy();
  });

  it('deve guardar um token', () => {
    const fakeToken = 'teste';
    tokenService.setToken(fakeToken);
    expect(tokenService.hasToken()).toBeTruthy();
    expect(tokenService.getToken()).toBe(fakeToken);
  });

  it('deve remover o token', () => {
    const fakeToken = 'teste';
    tokenService.setToken(fakeToken);
    tokenService.removeToken();
    expect(tokenService.hasToken()).toBeFalsy();
  });
});
