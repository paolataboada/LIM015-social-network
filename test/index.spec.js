import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user_a: {
          EmailRegister: 'labo@toria.com',
          IdUserActive: 'Labo123',
          NameRegister: 'Laboratoria',
          PhotoRegister: 'src/img/userPhoto-default.png',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData);

/* describe('logIn', () => {
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
}); */
