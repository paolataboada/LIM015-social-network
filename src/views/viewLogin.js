import { viewsDom } from './dom.js';

export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerRegistro');
  divElement.innerHTML = viewsDom.templateLogin;

  const btnIngresar = divElement.querySelector('#btnEntrar');
  btnIngresar.addEventListener('click', (e) => {
    e.preventDefault();
    const emailIngresar = divElement.querySelector('#emailIngresar').value;
    const passwordIngresar = divElement.querySelector('#contraseñaIngresar').value;

    const errorEmailLogIn = divElement.querySelector('#errorEmailLogIn');
    const errorPassLogIn = divElement.querySelector('#errorPassLogIn');

    firebase.auth().signInWithEmailAndPassword(emailIngresar, passwordIngresar)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.emailVerified);
        if (user.emailVerified === false) {
          window.location.hash = '#/';
          errorEmailLogIn.innerHTML = 'Email no está verificado';
        } else {
          window.location.hash = '#/inicio';
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        window.location.hash = '#/';
        // const errorEmailLogIn = divElement.querySelector('#errorEmailLogIn');
        // const errorPassLogIn = divElement.querySelector('#errorPassLogIn');

        switch (errorCode) {
          case 'auth/user-not-found':
            errorEmailLogIn.style.visibility = 'visible';
            break;
          case 'auth/invalid-email':
            errorEmailLogIn.style.visibility = 'visible';
            break;
          case 'auth/wrong-password':
            errorPassLogIn.style.visibility = 'visible';
            break;
          default:
            errorEmailLogIn.style.visibility = 'hidden';
            // divElement.querySelector('#signIn').reset();
            break;
        }
        console.log(errorCode);
      });
  });
  const btnGoogle = divElement.querySelector('#google');
  btnGoogle.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
        // ...
      })
      .then(() => {
        window.location.hash = '#/inicio';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  });
  return divElement;
};
