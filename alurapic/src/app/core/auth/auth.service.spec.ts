import { inject, TestBed } from '@angular/core/testing';

describe('O serviço UserService', () => {
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

  it('deve guardar um token', () => {
    const fakeToken = TOKEN;
    userService.setToken(fakeToken);
    expect(userService.isLogged()).toBeTruthy();
    expect(userService.getUserName()).toBe('flavio');
    userService.getUser().subscribe((user: User) => {
      expect(user.name).toBe('flavio');
    });
  });

  it('deve limpar as informações no logout', () => {
    userService.logout();
    expect(userService.isLogged()).toBeFalsy();
    expect(userService.getUserName()).toBe('');
    userService.getUser().subscribe((user: User) => {
      expect(user).toBeNull();
    });
  });

  afterEach(() => {
    localStorage.clear();
  });
});
