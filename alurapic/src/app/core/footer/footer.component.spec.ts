import { FooterComponent } from "./footer.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let fakeUser: User;
  let userService:UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [UserService],
      imports:[RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fakeUser = {
      email:'alvaro@alvaro.com',
      id:1,
      name:'Alvaro'
    }
    userService = TestBed.get(UserService);
    spyOn(userService,'getUser').and.returnValue(of(fakeUser));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

});
