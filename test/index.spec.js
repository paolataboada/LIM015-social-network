import MockFirebase from 'mock-cloud-firestore';

import { deletePosts/* , getPost */ } from '../src/views/firebaseFunctions.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          userIdent: 'user123',
          userPhotoPost: 'pepito.jpg',
          userWhoPublishes: 'Dafne',
          publishedText: 'Hola amigos',
          publicationDate: '12 de enero',
          likesPost: '3',
        },
        def456: {
          userIdent: 'user456',
          userPhotoPost: 'juanita.jpg',
          userWhoPublishes: 'Juanita',
          publishedText: 'Me encanta esta red social',
          publicationDate: '31 de septiembre',
          likesPost: '9',
        },
      },
    },
  },

};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

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
