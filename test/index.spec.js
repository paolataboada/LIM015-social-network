/* eslint-disable no-unused-vars */
import MockFirebase from 'mock-cloud-firestore';
import {
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
          likesPost: [],
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
          EmailRegister: 'labo@toria.com',
          IdUserActive: 'Labo123',
          NameRegister: 'Laboratoria',
          PhotoRegister: 'src/img/userPhoto-default.png',
        },
        /* jkl101: {
          EmailRegister: 'hola@mundo.com',
          IdUserActive: 'Hi345',
          NameRegister: 'Hola Mundo',
          PhotoRegister: '',
        }, */
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('getPost', () => {
  it('Debería poder obtener el post con id=abc123', () => getPost('abc123').then((dataPost) => {
    const result = dataPost.data();
    expect(result.publishedText).toBe('Texto publicado');
  }));
});

describe('getDataUser', () => {
  it('Debería poder obtener el nombre del usuario con id=ghi789', () => getDataUser('ghi789').then((dataUser) => {
    dataUser.forEach((doc) => {
      const result = doc.data();
      expect(result.NameRegister).toBe('Laboratoria');
    });
  }));
});

describe('upLikes y downLikes', () => {
  it('Debería añadir un like al post con id: def456', () => {
    upLikes('def456', '123ABC')
      .then(() => {
        getPost('def456').then((data) => {
          data.forEach((postLike) => {
            const resultUp = postLike.data();
            expect(resultUp.likesPost[0]).toBe('123ABC');
          });
        });
      });
  });
  it('Debería quitar un like al post con id: abc123', () => {
    downLikes('abc123', '123ABC')
      .then(() => {
        getPost('abc123').then((data) => {
          data.forEach((postLike) => {
            const resultDown = postLike.data();
            expect(resultDown.likesPost).toHaveLength(0);
          });
        });
      });
  });
});

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
