import { inject, TestBed } from '@angular/core/testing';

import { TokenService } from '../token/token.service';
import { User } from './user';
import { UserService } from './user.service';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU3MjY2ODg4NSwiZXhwIjoxNTcyNzU1Mjg1fQ.kzPLFizMUFd4HLmK3gZVEQPACoz3ENjCBD9V5xxbOZI';

describe('O serviço UserService', () => {
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService
      ]
    });
    userService = TestBed.get(UserService);
  });

  it('deve ser criado.', inject([UserService], (service: UserService) => {
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
