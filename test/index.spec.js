import logIn from '../src/views/viewLogin';
import { viewsDom } from '../src/views/dom';
import { promesaIngresar } from '../src/lib/firebaseFunctions.js';

describe('viewsDom', () => {
  it('debería ser un objeto', () => {
    expect(typeof viewsDom).toBe('object');
  });
});

describe('logIn', () => {
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
});

describe('templateLogin', () => {
  it('debería ser una propiedad con valor tipo string', () => {
    expect(typeof viewsDom.templateLogin).toBe('string');
  });
});

describe('promesaIngresar', () => {
  it('debería ser una funcion', () => {
    const email = 'lisaprado9@gmail.com';
    const password = '123456789';
    expect(typeof promesaIngresar(email, password)).toBe('function');
  });
  it('deberia ser una funcion que recibe dos argumentos', () => {
    expect(promesaIngresar()).toBeUndefined();
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
