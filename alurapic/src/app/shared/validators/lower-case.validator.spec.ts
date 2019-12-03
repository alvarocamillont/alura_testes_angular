import { isLowerCase } from './lower-case.validator';

describe("A função lowerCaseValidator", () => {
  it("deve confirmar quando recebe um texto em minúsculo.", () => {
    expect(isLowerCase("teste")).toBeFalsy();
  });

  it("deve validar quando for enviado um texto em branco", () => {
    expect(isLowerCase("")).toBeFalsy();
  });

  it("deve validar quando for enviado um texto em maiusculo", () => {
    expect(isLowerCase("Teste")).toBeTruthy();
  });
});
