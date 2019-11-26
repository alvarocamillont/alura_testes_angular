import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PhotoComponent } from "./photo.component";

describe("PhotoComponent", () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [PhotoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve ser criado", () => {
    expect(component).toBeTruthy();
  });

  it("deve tratar a url interna.", () => {
    component.url = "data/teste";
    expect(component.url).toBe("data/teste");
  });

  it("deve tratar url extern, anexando o endereço da api.", () => {
    component.url = "teste";
    expect(component.url).toBe("http://localhost:3000/imgs/teste");
  });
});
