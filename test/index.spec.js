/* eslint-disable no-unused-vars */
import MockFirebase from 'mock-cloud-firestore';
import {
  addDataUser,
  /* addPosts, */
  getPost,
  getDataUser,
  upLikes,
  downLikes,
} from '../src/views/firebaseFunctions';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          userIdent: '123ABC',
          userPhotoPost: '',
          userWhoPublishes: 'Paola',
          publishedText: 'Texto publicado',
          publicationDate: '',
          likesPost: ['123ABC', 'jkl010'],
        },
        def456: {
          userIdent: '456DEF',
          userPhotoPost: '',
          userWhoPublishes: 'Dafne',
          publishedText: 'Hola a todos',
          publicationDate: '',
          likesPost: ['123ABC'],
        },
      },
    },
    users: {
      __doc__: {
        ghi789: {
          NameRegister: 'Laboratoria',
          EmailRegister: 'labo@toria.com',
          IdUserActive: 'Labo123',
          PhotoRegister: 'src/img/userPhoto-default.png',
        },
      },
    },
  },
};

const newDataUser = {
  displayName: 'Hola Mundo',
  email: 'hola@mundo.com',
  uid: 'Hi345',
  photoURL: 'src/img/userPhoto-default.png',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addDataUser', () => {
  it('Debería poder agregar los datos de un nuevo usuario', (done) => {
    addDataUser(newDataUser)
      .then((docUser) => {
        const inDataUser = docUser;
        // console.log(inDataUser);
        expect(inDataUser).not.toBeUndefined();
        done();
      });
  });
});

describe('getDataUser', () => {
  // eslint-disable-next-line arrow-body-style
  it('Debería poder obtener el correo del usuario con id=ghi789', () => {
    return getDataUser()
      .then((dataUser) => { // console.log(dataUser);
        dataUser.forEach((doc) => { // console.log(doc);
          if (doc.id === 'ghi789') {
            const result = doc.data();
            // console.log(doc.id, doc.data());
            // const result = doc.data().find((element) => element === 'ghi789');
            expect(result.EmailRegister).toBe('labo@toria.com');
          }
        });
      });
  });
});

describe('getPost', () => {
  it('Debería poder obtener el post con id=abc123', () => getPost('abc123').then((dataPost) => {
    const result = dataPost.data();
    // console.log(result);
    expect(result.publishedText).toBe('Texto publicado');
  }));
});

describe('upLikes y downLikes', () => {
  // eslint-disable-next-line arrow-body-style
  it('Debería añadir un like al post con id: def456', () => {
    return upLikes('def456', 'ghi789')
      .then(() => {
        getPost('def456').then((postLike) => {
          const resultUp = postLike.data();
          // console.log(resultUp.likesPost);
          expect(resultUp.likesPost).toHaveLength(2);// toEqual(['123ABC', 'ghi789']);
        });
      });
  });
  // eslint-disable-next-line arrow-body-style
  it('Debería quitar un like al post con id: abc123', () => {
    return downLikes('abc123', '123ABC').then(() => {
      getPost('abc123').then((postLike) => {
        const resultDown = postLike.data();
        // console.log(resultDown.likesPost);
        expect(resultDown.likesPost).toHaveLength(1);
      });
    });
  });
});

/* describe('addDataUser', () => {
  it('Debería poder agregar los datos de un nuevo usuario', (done) => {
    jest.setTimeout(30000);
    addDataUser(newDataUser)
      .then((docUser) => {
        const inDataUser = docUser;
        console.log(docUser);
        getDataUser()
          .then((query) => {
            const result = query.filter((user) => console.log(user));
            console.log(query, 'ohhhh', typeof result);
            expect(inDataUser.IdUserActive).toBe('Hi345');
            done();
          });
      });
  });
}); */
/* describe('updatePosts', () => {
  it('Debería poder actualizar el post con id: abc125', (done) => {
    updatePosts('abc125', { post: 'Post actualizado' }).then(() => {
      const callback = (postDoc) => {
        // console.log(postDoc); // Actualizo el doc con id = 'abc125'
        const result = postDoc.find((elemento) => elemento.id === 'abc125');
        expect(result.post).toBe('Post actualizado');
        done();
      };
      getPos(callback);
    });
  });
}); */

/* describe('Comprueba que se agregue un nuevo doc a la colección', () => {
  it('Debería poder agregar un post del usuario', () =>
  addPosts('', 'Este es mi post', 'Jimena', '03-user').then((data) => {
    getPost('03-user').then((newData) => newData);
    console.log(data);
    expect(data).toBe('¡Pude publicar!');
  }));
}); */

/* describe('addPosts', () => {
  it('Debería poder agregar un post de usuario', () => {
    addPosts('Paola', 'Texto publicado', 'src/img/userPhoto-default.png', '01-id-user')
    .then(() => {
        getPost(data => {
          const callback = data.find(postCatch => { postCatch.publishedText === 'Texto publicado' })
          expect(callback.publishedText).toBe('Texto publicado')
        })
      })
    }
}); */

/* const fixtureData = {
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
}; */

/* describe('logIn', () => {
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
}); */
