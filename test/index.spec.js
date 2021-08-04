// importamos la funcion que vamos a testear
import { registrar } from '../src/views/registro';

describe('registrar', () => {
  it('debería ser una función', () => {
    expect(typeof registrar).toBe('function');
  });
});

describe('registro', () => {
  it('debería ser una variable tipo string', () => {
    expect(typeof registro).toBe('string');
  });
});
