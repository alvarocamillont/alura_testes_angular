import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { FooterComponent } from './footer.component';

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let fakeUser: User;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [UserService],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fakeUser = {
      email: "alvaro@alvaro.com",
      id: 1,
      name: "Alvaro"
    };
    userService = TestBed.get(UserService);
    spyOn(userService, "getUser").and.returnValue(of(fakeUser));

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve ser criado", () => {
    expect(component).toBeTruthy();
  });
});
