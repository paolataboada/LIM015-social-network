import {
  createUser,
  ingresarConEmail,
  ingresarConGoogle,
  sendEmail,
  /* userActive, */
} from '../src/views/firebaseFunctions';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();

mockauth.autoFlush();

global.firebase = new firebasemock.MockFirebaseSdk(
  () => null, // use null if your code does not use AUTHENTICATION
  () => mockauth,
);

describe('createUser', () => {
  it('Debería poder registrar un nuevo usuario', (done) => {
    createUser('paola@gmail.com', '1234567')
      .then((user) => {
        expect(user.email).toBe('paola@gmail.com');
        done();
      });
  });
});

describe('ingresarConEmail', () => {
  it('Debería poder ingresar con un correo registrado', () => {
    ingresarConEmail('dafne@gmail.com', '7654321')
      .then((credential) => {
        expect(credential.email).toBe('7654321');
      });
  });
});

describe('ingresarConGoogle', () => {
  it('Debería poder ingresar con su cuenta de Google', () => {
    ingresarConGoogle()
      .then((userGoogle) => {
        // console.log(userGoogle.providerData.providerId);
        expect(userGoogle.isAnonymous).toBe(false);
        expect(userGoogle.providerData.providerId).toBe('google.com');
      });
  });
});

describe('sendEmail', () => {
  it('Debería poder enviar un correo de verificación', () => {
    ingresarConEmail('pipo@dog.com', 'perrito1')
      .then(() => {
        const mockVerify = jest.fn();
        firebase.auth().currentUser.sendEmailVerification = mockVerify;
        sendEmail();
        expect(mockVerify).toHaveBeenCalled();
      });
  });
});
