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
    const enviar = divElement.querySelector('#btnEnviar').value;

    const errorNameSignUp = divElement.querySelector('#errorNameSignUp');
    const errorEmailSignUp = divElement.querySelector('#errorEmailSignUp');
    const errorPassSignUp = divElement.querySelector('#errorPassSignUp');
    const errorPassConfSignUp = divElement.querySelector('#errorPassConfSignUp');

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
        containerModal.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        console.log(errorCode, errorMessage);
        // const errorNameSignUp = divElement.querySelector('#errorNameSignUp');
        // const errorEmailSignUp = divElement.querySelector('#errorEmailSignUp');
        // const errorPassSignUp = divElement.querySelector('#errorPassSignUp');
        // const errorPassConfSignUp = divElement.querySelector('#errorPassConfSignUp');
        if (name === '') {
          errorNameSignUp.style.visibility = 'visible';
        } else {
          errorNameSignUp.style.visibility = 'hidden';
        }
        if (email === '') {
          errorEmailSignUp.style.visibility = 'visible';
        } else {
          errorEmailSignUp.style.visibility = 'hidden';
        }
        if (password === '') {
          errorPassSignUp.style.visibility = 'visible';
        } else {
          errorPassSignUp.style.visibility = 'hidden';
        }
        if (passconfirm === '') {
          errorPassConfSignUp.style.visibility = 'visible';
        } else {
          errorPassConfSignUp.style.visibility = 'visible';
        }
        if (passconfirm !== password) {
          errorPassConfSignUp.style.visibility = 'visible';
          console.log('contraseñas desiguales');
          enviar.disabled = true;
        } else {
          errorPassConfSignUp.style.visibility = 'hidden';
          console.log('contraseñas iguales');
        }
        if (errorCode === 'auth/invalid-email') {
          errorEmailSignUp.style.visibility = 'visible';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorEmailSignUp.innerHTML = 'El correo ya ha sido registrado';
          errorEmailSignUp.style.visibility = 'visible';
        } else if (errorCode === 'auth/weak-password') {
          errorPassSignUp.style.visibility = 'visible';
        } else {
          errorEmailSignUp.style.visibility = 'hidden';
        }

        // switch (errorCode) {
        //   case 'auth/invalid-email':
        //     errorEmailSignUp.style.visibility = 'visible';
        //     break;
        //   case 'auth/email-already-in-use':
        //     errorEmailSignUp.innerHTML = 'El correo ya ha sido registrado';
        //     // errorEmailSignUp.style.visibility = 'visible';
        //     break;
        //   case 'auth/weak-password':
        //     errorPassSignUp.style.visibility = 'visible';
        //     break;
        //   default:
        //     errorEmailSignUp.style.visibility = 'hidden';
        //     errorPassSignUp.style.visibility = 'hidden';
        //     // divElement.querySelector('#signIn').reset();
        //     break;
        // }
        console.log(errorCode);
      });
  });

  return divElement;
};
