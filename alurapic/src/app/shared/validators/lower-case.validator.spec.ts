import { AbstractControl } from '@angular/forms';

import { lowerCaseValidator } from './lower-case.validator';

describe('A função lowerCaseValidator', () => {
  it('deve confirmar quando recebe um texto em minúsculo.', () => {
    const fakeControl: AbstractControl = { value: 'teste' } as AbstractControl;
    expect(lowerCaseValidator(fakeControl)).toBeNull();
  });

  it('deve validar quando for enviado um texto em branco', () => {
    const fakeControl: AbstractControl = { value: '' } as AbstractControl;
    expect(lowerCaseValidator(fakeControl)).toBeNull();
  });

  it('deve validar quando for enviado um texto em maiusculo', () => {
    const fakeControl: AbstractControl = { value: 'Teste' } as AbstractControl;
    expect(lowerCaseValidator(fakeControl)).toEqual({ lowerCase: true });
  });
});
