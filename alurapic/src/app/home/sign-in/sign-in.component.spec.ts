import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { VMessageModule } from "src/app/shared/componets/vmessage/vmessage.module";

import { SignInComponent } from "./sign-in.component";
import { AuthService } from "src/app/core/auth/auth.service";
import { of, throwError } from "rxjs";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let navigateSpy: jasmine.Spy;
  let navigateByNameSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        VMessageModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [AuthService],
      declarations: [SignInComponent]
    }).compileComponents();
    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    navigateSpy = spyOn((<any>component).router, "navigate");
    navigateByNameSpy = spyOn((<any>component).router, "navigateByUrl");
    fixture.detectChanges();
  });

  it("deve ser criado", () => {
    expect(component).toBeTruthy();
  });

  it("deve realizar o login e direcionar para a página do usuário caso os dados estejam corretos", () => {
    component.loginForm.get("userName").setValue("alvaro");
    component.loginForm.get("password").setValue("123");
    spyOn(authService, "authenticate").and.returnValue(of(null));
    component.fromUrl = undefined;
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(["user", "alvaro"]);
  });

  it("deve realizar o login e direcionar para a página digitada caso os dados estejam corretos", () => {
    component.loginForm.get("userName").setValue("alvaro");
    component.loginForm.get("password").setValue("123");
    spyOn(authService, "authenticate").and.returnValue(of(null));
    component.fromUrl = "/teste";
    component.login();
    expect(navigateByNameSpy).toHaveBeenCalledWith("/teste");
  });

  it("não deve realizar o login caso os dados estejam corretos", () => {
    component.loginForm.get("userName").setValue("alvaro");
    component.loginForm.get("password").setValue("123");
    spyOn(authService, "authenticate").and.returnValue(throwError("Erro"));
    component.login();
    expect(component.loginForm.get("userName").value).toBeFalsy();
    expect(component.loginForm.get("password").value).toBeFalsy();
  });
});
