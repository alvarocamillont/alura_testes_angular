import { isLowerCase } from './lower-case.validator';

describe("A função isLowerCase", () => {
  it("deve confirmar quando recebe um texto em caixa baixa.", () => {
    let valor = 'mario';
    let resultado = isLowerCase(valor);
    expect(resultado).toBe(true);
  });

  it("deve validar quando for enviado um texto em branco", () => {
    expect(isLowerCase("")).toBeFalsy();
  });

  it("deve validar quando for enviado um texto com caixa alta", () => {
    expect(isLowerCase("Mario")).toBeFalsy();
  });
});
