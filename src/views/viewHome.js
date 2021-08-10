import { viewsDom } from './dom.js';
import { cerrarSesion } from '../lib/firebaseFunctions.js';

export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = viewsDom.templateHome;

  divElement.querySelector('#btnFile').addEventListener('click', () => {
    divElement.querySelector('#subirFile').click();
  });

  // Función para publicar post
  divElement.querySelector('#btnCompartir').addEventListener('click', () => {
    firebase.firestore().collection('users').add({
      publicacion: divElement.querySelector('#post').value,
      imagen: divElement.querySelector('#subirFile').value,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        divElement.querySelector('#userPost').textContent = divElement.querySelector('#post').value;
        divElement.querySelector('#userImage').textContent = divElement.querySelector('#subirFile').value;
        console.log(divElement.querySelector('#post').value);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    // Add a second document with a generated ID.
    // firebase.firestore().collection('users').add({
    //   first: 'Alan',
    //   middle: 'Mathison',
    //   last: 'Turing',
    //   born: 1912,
    // })
    //   .then((docRef) => {
    //     console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document: ', error);
    //   });
  });

  // Funcion para cerar sesión
  const btnSalir = divElement.querySelector('#btnSalir');
  btnSalir.addEventListener('click', () => {
    // firebase.auth().signOut()

    cerrarSesion()
      .then(() => {
        // Sign-out successful.
        window.location.hash = '#/';
        console.log('Se ha cerrado sesión');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });

  return divElement;
};
