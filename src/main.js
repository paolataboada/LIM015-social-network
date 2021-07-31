// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
import { changeView } from './lib/index.js';

const iniciar = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', iniciar);

// console.log(window.location.hash);

/* const containerModal = divElement.querySelector('#container-modal');
containerModal.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#e-mail').value;
  const password = document.querySelector('#contraseña').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      containerModal.reset();
      console.log('sign up', userCredential);
    // Signed in
      // const user = userCredential.user;
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
}); */
