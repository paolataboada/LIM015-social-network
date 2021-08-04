// importamos la funcion que vamos a testear
import logIn from '../src/views/viewLogin';
import { viewsDom } from '../src/views/dom';

describe('logIn', () => {
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
});

describe('viewsDom', () => {
  it('debería ser un objeto', () => {
    expect(typeof viewsDom).toEqual('object');
  });
});

describe('templateLogin', () => {
  it('debería ser una propiedad con valor tipo string', () => {
    expect(typeof viewsDom.templateLogin).toBe('string');
  });
});
