import logIn from '../src/views/viewLogin';
import { viewsDom } from '../src/views/dom';

describe('logIn', () => {
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
});

describe('viewsDom', () => {
  it('debería ser un objeto', () => {
    expect(typeof viewsDom).toBe('object');
  });
});

describe('templateLogin', () => {
  it('debería ser una propiedad con valor tipo string', () => {
    expect(typeof viewsDom.templateLogin).toBe('string');
  });
});

// test('resuelve a limon', () =>
// Es esencial que se agregue un statement de return
// expect(Promise.resolve('limon')).resolves.toBe('limon'));

// test('rejects to octopus', () =>
// make sure to add a return statement
// expect(hola.promesaIngresar.reject(new Error('octopus'))).rejects.toThrow(
//   'octopus',
// ));
