import { SignUpComponent } from "./signup.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { VMessageModule } from "src/app/shared/componets/vmessage/vmessage.module";

import { of, throwError } from "rxjs";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";
import { SignUpService } from "./signup.service";

describe("SignInComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: SignUpService;
  let userNotTakenValidatorService: UserNotTakenValidatorService;
  let navigateSpy: jasmine.Spy;
  let saveLog;

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
    signUpService = TestBed.get(SignUpService);
    userNotTakenValidatorService = TestBed.get(UserNotTakenValidatorService);
    spyOn(
      userNotTakenValidatorService,
      "checkUserNameTaken"
    ).and.returnValue(() => of(null));
  }));

  beforeEach(() => {
    saveLog = console.log;
  });

  afterEach(() => {
    console.log = saveLog;
  });

  beforeEach(() => {
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
    console.log = jasmine.createSpy("log");
    component.signupForm.get("email").setValue("alvaro@test.com");
    component.signupForm.get("fullName").setValue("Alvaro");
    component.signupForm.get("userName").setValue("alvaro");
    component.signupForm.get("password").setValue("123");
    spyOn(signUpService, "signup").and.returnValue(throwError("Erro"));
    component.signUp();
    expect(console.log).toHaveBeenCalledWith("Erro");
  });
});