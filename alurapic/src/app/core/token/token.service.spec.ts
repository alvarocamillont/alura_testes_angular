import { TokenService } from './token.service';

describe('O serviço TokenService', () => {
  let service: TokenService;
  let fakeToken:string;

  beforeEach(() => {
    service = new TokenService();
    fakeToken = 'teste'
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve ser instanciado corretamente.', () => {
    const service = new TokenService()
    expect(service).toBeTruthy();
  });

  it('deve guardar um token', () => {
    service.setToken(fakeToken);
    expect(service.hasToken()).toBeTruthy();
    expect(service.getToken()).toBe(fakeToken);
  });

  it('deve remover o token', () => {
    service.setToken(fakeToken);
    service.removeToken();
    expect(service.hasToken()).toBeFalsy();
  });
});
