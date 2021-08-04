import { viewsDom } from './dom.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewsDom.templateSignup;

  function verificar() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
      });
  }
  const containerModal = divElement.querySelector('#container-modal');
  containerModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#e-mail').value;
    const password = divElement.querySelector('#contraseña').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        containerModal.reset();
        console.log('sign up', userCredential);
        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .then(() => {
        verificar();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });
  });

  return divElement;
};
