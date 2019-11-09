import { TestBed } from '@angular/core/testing';

import { UserService } from '../user/user.service';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

describe('O serviço AuthGuard', () => {
  let guard: AuthGuard;
  let mockSnapshot: any;
  let mockRoute: any;
  let userService: UserService;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    mockRoute = [{ path: '', pathMatch: 'full', redirectTo: 'home' }];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoute)],
      providers: [AuthGuard, UserService]
    });

    guard = TestBed.get(AuthGuard);
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    mockSnapshot.url = 'teste';
    navigateSpy = spyOn((<any>guard).router, 'navigate');
    userService = TestBed.get(UserService);
  });

  it('deve ser instaciada', () => {
    expect(guard).toBeTruthy();
  });

  it('deve permitir o usuario acessar a rota caso esteja autenticado', () => {
    spyOn(userService, 'isLogged').and.returnValue(true);
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBeTruthy();
  });

  it('não deve permitir o usuario acessar a rota caso esteja inválido', () => {
    spyOn(userService, 'isLogged').and.returnValue(false);
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith([''], {
      queryParams: {
        fromUrl: 'teste'
      }
    });
  });
});
