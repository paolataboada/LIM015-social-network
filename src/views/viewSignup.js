import { viewsDom } from './dom.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewsDom.templateSignup;

  // Funcion para envío de mensaje de verificación
  function verificar() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('se ha enviado un correo de verificación');
        window.location.hash = '#/';
        console.log(firebase.auth().currentUser.user.displayName);
      }).catch((error) => {
        console.log(error);
      });
  }
  const containerModal = divElement.querySelector('#container-modal');

  // Función que se va a ejecutar cuando se envíe el formulario
  containerModal.addEventListener('submit', (e) => {
    e.preventDefault();
    // Constantes para llamar a valores del dom
    const name = divElement.querySelector('#usuario').value;
    const email = divElement.querySelector('#e-mail').value;
    const password = divElement.querySelector('#contraseña').value;
    const passconfirm = divElement.querySelector('#confirmarContraseña').value;

    // Constantes para activar o desactivar los string de errores
    const errorNameSignUp = divElement.querySelector('#errorNameSignUp');
    const errorEmailSignUp = divElement.querySelector('#errorEmailSignUp');
    const errorPassSignUp = divElement.querySelector('#errorPassSignUp');
    const errorPassConfSignUp = divElement.querySelector('#errorPassConfSignUp');

    if (passconfirm !== password) {
      errorPassConfSignUp.style.visibility = 'hidden';
      console.error('contraseñas desiguales');
      // enviar.disabled = true;
    } else {
      errorPassConfSignUp.style.visibility = 'hidden';
      console.log('contraseñas iguales');
      // Inicio de la Promesa para obtener respuestas que envía createUser...
      firebase.auth().createUserWithEmailAndPassword(email, password)
        // Primero se ejecuta las sgts condiciones
        .then((userCredential) => {
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
            errorPassConfSignUp.textContent = 'Por favor confirma tu contraseña';
          }
          containerModal.reset();
          console.log('sign up', userCredential, name, email, password, passconfirm);
          console.log(userCredential.user);
          // console.log(name);
          // divElement.querySelector('#nombreUsuario').textContent = name;
          // Signed in
          // const user = userCredential.user;
          // ...
        })

        // Para que se ejecute siempre y cuando la promesa anterior haya culminado
        .then(() => {
          verificar();
          containerModal.reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorCode, errorMessage);
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

          console.log(errorCode);
        });
    }
  });

  return divElement;
};
