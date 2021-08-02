export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const registro = `
    <div id="logoPrincipal">
      <figure><img src ="img/logo-azul.png"></figure>
      <h2>Social Health </h2>
    </div>
    <div id="dataLogIn"> 
      <p>¡Bienvenid@ a Social Health!</p>
      <form id="signIn">
        <input type="email" placeholder="Email" id="emailIngresar" autocomplete="off">
        <input type="password" placeholder="Contraseña" id="contraseñaIngresar" autocomplete="off">
        <button id="btnEntrar">Ingresar</button>
      </form>
    </div>
    <div id="signUp">
      <p> O bien ingresa con: </p>
      <div id="logosRegister">
        <img id="fb" src="img/Facebook.png">
        <img id="google" src="img/Google.png">
      </div>
      <p>No tienes una cuenta? <a id="btnRegistrar" href="#/modal">Regístrate</a></p>
    </div> `;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerRegistro');
  divElement.innerHTML = registro;

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
        // ...
      });
  });
  return divElement;
};
