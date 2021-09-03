/**
 * @jest-environment jsdom
 */
import MockFirebase from 'mock-cloud-firestore';
import {
  addDataUser,
  addDataUserCorreo,
  addPosts,
  getPost,
  getDataUser,
  upLikes,
  downLikes,
  countLikes,
  deletePosts,
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

// Simula objeto devuelto al ingresar con Google
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

// Simula los datos del usuario obtenidos al registrarse manualmente
const uDataName = 'Patricia';
const uDataEmail = 'paty@mail.com';
const uDataID = { uid: '4ct1v0' };

describe('addDataUserCorreo', () => {
  it('Debería guardar los datos en la colección users', (done) => {
    addDataUserCorreo(uDataName, uDataEmail, uDataID)
      .then((docUser) => {
        const inDataUser = docUser.id; // console.log(inDataUser);
        getDataUser().then((registeredData) => { // console.log(registeredData);
          registeredData.forEach((newDoc) => {
            if (newDoc.id === inDataUser) {
              const resultRegister = newDoc.data();
              // console.log(resultRegister);
              expect(typeof resultRegister).toBe('object');
              done();
            }
          });
        });
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

// Simula objeto devuelto al ingresar con Google
const userGoogle = {
  displayName: null,
  email: 'hola@mundo.com',
  uid: 'BB007',
  photoURL: null,
};
// Simula el valor del 'input text' obtenido al publicar
const textPost = {
  value: 'Mi post',
};

describe('addPosts', () => {
  it('Debería poder agregar un nuevo post', (done) => {
    addPosts('Jimena', textPost, userGoogle, userGoogle.uid)
      .then((newPost) => {
        const inDataPost = newPost.id;
        // console.log(inDataPost);
        getPost(inDataPost).then((docPost) => {
          // console.log(docPost);
          expect(typeof docPost).toBe('object');
          done();
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
      .then(() => { // abc123: ['123ABC', 'jkl010'], def456: ['123ABC']
        getPost('def456').then((postLike) => {
          const resultUp = postLike.data();
          // console.log('likes length +', resultUp.likesPost);
          expect(resultUp.likesPost).toHaveLength(2);// toEqual(['123ABC', 'ghi789']);
        });
      });
  });
  // eslint-disable-next-line arrow-body-style
  it('Debería quitar un like al post con id: abc123', () => {
    return downLikes('abc123', '123ABC').then(() => {
      getPost('abc123')
        .then((postLike) => { // abc123: ['123ABC', 'jkl010'], def456: ['123ABC']
          const resultDown = postLike.data();
          // console.log('likes length -', resultDown.likesPost);
          const indexValue = resultDown.likesPost.indexOf('123ABC') === -1;
          expect(indexValue).toBeTruthy(); // toHaveLength(1);
        });
    });
  });
});

// Simula el DOM que contiene el botón de like (etiqueta img)
const domTarget = document.createElement('div');
domTarget.innerHTML = '<img class="iconoLike " src="img/megusta.png">';
domTarget.innerHTML += '<img class="painted" src="img/megusta.png">';
const likeTarget = domTarget.querySelector('.iconoLike'); // console.log(likeTarget.src);
const unlikeTarget = domTarget.querySelector('.painted');

describe('countLikes', () => {
  it('Debería ser una función', () => {
    expect(typeof countLikes).toBe('function');
  }); // abc123: ['123ABC', 'jkl010'], def456: ['123ABC']
  it('Debería llevar el conteo de likes para el post con id: abc123', () => {
    countLikes(likeTarget, 'abc123', 'azaza');
    /* .then((counter) => {
      console.log(counter);
      const resultUp = counter.data();
      // console.log(resultUp.likesPost);
      expect(resultUp.likesPost).toHaveLength(4);
    }); */
  });
  it('Debería llevar el conteo de likes para el post con ID: abc123', () => {
    countLikes(unlikeTarget, 'abc123', 'azaza');
    /* .then((counter) => {
      console.log(counter);
      const resultUp = counter.data();
      // console.log(resultUp.likesPost);
      expect(resultUp.likesPost).toHaveLength(4);
    }); */
  });
});

describe('Delete Post', () => {
  it('Debería de poder eliminar un post con el id: abc123', () => deletePosts('abc123')
    .then((data) => {
      /* const deleted = getPost('abc123');
      console.log(data); */
      expect(data).toBe(undefined);
    }));
});

/* describe('deletePosts', () => {
  it('Debería de poder eliminar un post con el id: abc123', () => deletePosts('abc123')
  .then((posts) => {
    getPost('abc123');
    const result = posts.find((elemento) => elemento.id === 'abc123');
    expect(result).toBe(undefined);
  }));
}); */

/* describe('Comprueba que se agregue un nuevo doc a la colección', () => {
  it('Debería poder agregar un post del usuario', () =>
  addPosts('', 'Este es mi post', 'Jimena', '03-user').then((data) => {
    getPost('03-user').then((newData) => newData);
    console.log(data);
    expect(data).toBe('¡Pude publicar!');
  }));
}); */

/* describe('logIn', () => {
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  }); */
