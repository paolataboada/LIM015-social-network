import MockFirebase from 'mock-cloud-firestore';
import {
  addDataUser,
  addDataUserCorreo,
  getDataUser,
  addPosts,
  getPost,
  /* onSnapshotPosts,
  updatePosts, */
  deletePosts,
  upLikes,
  downLikes,
  queryIdentity,
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
        z1a02: {
          userIdent: '456DEF',
          userPhotoPost: '',
          userWhoPublishes: 'Pablito',
          publishedText: 'Me llaman Pablo',
          publicationDate: '',
          likesPost: [],
        },
        d3l3t3: {
          userIdent: 'er4s3',
          userPhotoPost: '',
          userWhoPublishes: 'Danna',
          publishedText: 'Este post será borrado',
          publicationDate: '',
          likesPost: [],
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
        const inDataUser = docUser.id;
        getDataUser().then((registeredData) => {
          registeredData.forEach((newDoc) => {
            if (newDoc.id === inDataUser) {
              const resultRegister = newDoc.data();
              expect(typeof resultRegister).toBe('object');
              done();
            }
          });
        });
      });
  });
});

describe('getDataUser', () => {
  it('Debería poder obtener el nombre y correo del usuario con id=ghi789', () => getDataUser()
    .then((dataUser) => {
      dataUser.forEach((doc) => {
        if (doc.id === 'ghi789') {
          const result = doc.data();
          expect(result.NameRegister).toBe('Laboratoria');
          expect(result.EmailRegister).toBe('labo@toria.com');
        }
      });
    }));
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
        getPost(inDataPost).then((docPost) => {
          expect(typeof docPost).toBe('object');
          done();
        });
      });
  });
});

describe('getPost', () => {
  it('Debería poder obtener el texto del post con id=abc123', () => getPost('abc123').then((dataPost) => {
    const result = dataPost.data();
    expect(result.publishedText).toBe('Texto publicado');
  }));
});

describe('Delete Post', () => {
  it('Debería de poder eliminar el post con el id: d3l3t3', () => deletePosts('d3l3t3')
    .then((data) => {
      expect(data).toBe(undefined);
    }));
});

describe('upLikes y downLikes', () => {
  it('Debería añadir un like al post con id: def456', () => upLikes('def456', 'ghi789')
    .then(() => {
      getPost('def456').then((postLike) => {
        const resultUp = postLike.data();
        expect(resultUp.likesPost).toHaveLength(2);
        expect(resultUp.likesPost).toEqual(['123ABC', 'ghi789']);
      });
    }));
  it('Debería quitar un like al post con id: abc123', () => downLikes('abc123', '123ABC').then(() => {
    getPost('abc123')
      .then((postLike) => {
        const resultDown = postLike.data();
        const indexValue = resultDown.likesPost.indexOf('123ABC') === -1;
        expect(indexValue).toBeTruthy();
        expect(resultDown.likesPost).toHaveLength(1);
      });
  }));
});

describe('queryIdentity', () => {
  it('Debería consultar la data que coincida con el ID del usuario activo', () => {
    queryIdentity('456DEF')
      .then((userActive) => {
        userActive.forEach((docs) => {
          const userInDocs = docs.data().userIdent;
          expect(userInDocs).toBe('456DEF');
        });
      });
  });
});
