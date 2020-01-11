import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { VMessageModule } from 'src/app/shared/componets/vmessage/vmessage.module';

import { SignUpComponent } from './signup.component';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

describe("SignInComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: SignUpService;
  let userNotTakenValidatorService: UserNotTakenValidatorService;
  let navigateSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        VMessageModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [SignUpService, UserNotTakenValidatorService],
      declarations: [SignUpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    signUpService = TestBed.get(SignUpService);
    userNotTakenValidatorService = TestBed.get(UserNotTakenValidatorService);
    spyOn(
      userNotTakenValidatorService,
      "checkUserNameTaken"
    ).and.returnValue(() => of(null));
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    navigateSpy = spyOn((<any>component).router, "navigate");
    fixture.detectChanges();
  });

  it("deve ser criado", () => {
    expect(component).toBeTruthy();
  });

  it("deve realizar o cadastro de um usuário com o formulário correto.", () => {
    component.signupForm.get("email").setValue("alvaro@test.com");
    component.signupForm.get("fullName").setValue("Alvaro");
    component.signupForm.get("userName").setValue("alvaro");
    component.signupForm.get("password").setValue("123");
    spyOn(signUpService, "signup").and.returnValue(of(null));
    component.signUp();
    expect(navigateSpy).toHaveBeenCalledWith([""]);
  });

  it("deve realizar o log caso o serviço retorne algum erro.", () => {
    const spyLog = spyOn(console, "log");
    component.signupForm.get("email").setValue("alvaro@test.com");
    component.signupForm.get("fullName").setValue("Alvaro");
    component.signupForm.get("userName").setValue("alvaro");
    component.signupForm.get("password").setValue("123");
    spyOn(signUpService, "signup").and.returnValue(throwError("Erro"));
    component.signUp();
    expect(spyLog).toHaveBeenCalledWith("Erro");
  });
});
