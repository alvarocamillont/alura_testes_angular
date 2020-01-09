import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AlertModule } from 'src/app/shared/componets/alert/alert.module';
import { LoadingModule } from 'src/app/shared/componets/loading/loading.module';
import { MenuModule } from 'src/app/shared/componets/menu/menu.module';

import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { HeaderComponent } from './header.component';

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fakeUser: User;
  let userService: UserService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [UserService],
      imports: [
        RouterTestingModule.withRoutes([]),
        MenuModule,
        LoadingModule,
        AlertModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fakeUser = {
      email: "alvaro@alvaro.com",
      id: 1,
      name: "Alvaro"
    };
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    spyOn(userService, "getUser").and.returnValue(of(fakeUser));

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve ser criado", () => {
    expect(component).toBeTruthy();
  });

  it("deve realizar o logout", () => {
    const navigateSpy = spyOn(router, "navigate");
    spyOn(userService, "logout").and.returnValue(null);
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith([""]);
  });
});
