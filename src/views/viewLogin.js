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

    firebase.auth().signInWithEmailAndPassword(emailIngresar, passwordIngresar)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('se ha iniciado sesión', user.email);
      })
      .then(() => {
        window.location.hash = '#/inicio';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // if (error.code === 'auth/invalid-email') {
        //   console.log('El correo es inválido');
        // } else if (error.code === 'auth/wrong-password') {
        //   console.log('La contraseña es inválida');
        // } else {
        //   console.log('El correo es válido');
        // }

        console.log(errorCode, errorMessage);
        alert(errorMessage);
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
