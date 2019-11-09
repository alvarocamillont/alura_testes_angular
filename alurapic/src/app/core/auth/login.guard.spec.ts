import { TestBed } from '@angular/core/testing';

import { UserService } from '../user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginGuard } from './login.guard';

describe('O serviço LoginGuard', () => {
  let guard: LoginGuard;
  let mockSnapshot: any;
  let mockRoute: any;
  let userService: UserService;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    mockRoute = [{ path: '', pathMatch: 'full', redirectTo: 'home' }];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoute)],
      providers: [LoginGuard, UserService]
    });

    guard = TestBed.get(LoginGuard);
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    navigateSpy = spyOn((<any>guard).router, 'navigate');
    userService = TestBed.get(UserService);
  });

  it('deve ser instaciada', () => {
    expect(guard).toBeTruthy();
  });

  it('não deve permitir o usuario acessar a tela de login caso já esteja autorizado', () => {
    spyOn(userService, 'isLogged').and.returnValue(true);
    spyOn(userService, 'getUserName').and.returnValue('alvaro');
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['user', 'alvaro']);
  });

  it('deve permitir o usuario não autenticado acessar a página de login', () => {
    spyOn(userService, 'isLogged').and.returnValue(false);
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBeTruthy();
  });
});
