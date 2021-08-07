import { viewsDom } from './dom.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewsDom.templateSignup;

  function verificar() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        console.log('se ha enviado un correo de verificación');
      }).catch((error) => {
        console.log(error);
      });
  }
  const containerModal = divElement.querySelector('#container-modal');
  containerModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = divElement.querySelector('#usuario').value;
    const email = divElement.querySelector('#e-mail').value;
    const password = divElement.querySelector('#contraseña').value;
    const passconfirm = divElement.querySelector('#confirmarContraseña').value;
    const enviar = divElement.querySelector('#btnEntrar');
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        containerModal.reset();
        console.log('sign up', userCredential, name, email, password, passconfirm);
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

        const errorNameSignUp = divElement.querySelector('#errorNameSignUp');
        const errorEmailSignUp = divElement.querySelector('#errorEmailSignUp');
        const errorPassSignUp = divElement.querySelector('#errorPassSignUp');
        const errorPassConfSignUp = divElement.querySelector('#errorPassConfSignUp');

        if (name === '') {
          errorNameSignUp.style.visibility = 'visible';
          enviar.disable = true;
        } else if (name !== '') {
          errorNameSignUp.style.visibility = 'hidden';
        }
        if (email === '') {
          errorEmailSignUp.style.visibility = 'visible';
          enviar.disable = true;
        } else if (email !== '') {
          errorEmailSignUp.style.visibility = 'hidden';
        }
        if (errorCode === 'auth/invalid-email') {
          errorEmailSignUp.style.visibility = 'visible';
          enviar.disable = true;
        } else if (errorCode === 'auth/email-already-in-use') {
          errorEmailSignUp.innerHTML = 'El correo ya ha sido registrado';
          errorEmailSignUp.style.visibility = 'visible';
          enviar.disable = true;
        }
        if (password === '') {
          errorPassSignUp.style.visibility = 'visible';
          enviar.disable = true;
        } else if (errorCode === 'auth/weak-password') {
          errorPassSignUp.style.visibility = 'visible';
          enviar.disable = true;
        }
        if (passconfirm === '') {
          errorPassConfSignUp.style.visibility = 'visible';
          enviar.disable = true;
        }
        if (passconfirm !== password) {
          errorPassConfSignUp.style.visibility = 'visible';
          enviar.disable = true;
        }
        /* else if (password !== '' && passconfirm !== '') {
          errorPassSignUp.style.visibility = 'hidden';
          errorPassConfSignUp.style.visibility = 'hidden';
        } */
      });
  });

  return divElement;
};
