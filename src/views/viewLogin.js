import { signInEmail, signInGoogle } from './firebaseFunctions.js';

export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerRegistro');
  divElement.innerHTML = `
    <div id="logoPrincipal">
      <figure><img src="img/logo-azul.png"></figure>
      <h2>Social Health</h2>
    </div>
    <div id="dataLogIn"> 
      <p id="welcome">¡Bienvenid@ a Social Health!</p>
      <form id="signIn" method='POST'>
        <input type="email" placeholder="Email" id="emailLogIn" minlength="5" required>
        <p id="errorEmailLogIn">Cuenta no encontrada o incorrecta</p>
        <input type="password" placeholder="Contraseña" id="contraseñaLogIn" minlength="5" required>
        <p id="errorPassLogIn">Contraseña de logueo incorrecta</p>
        <button id="btnEntrar">Ingresar</button>
      </form>
    </div>
    <div id="signUp">
      <p>O bien ingresa con:</p>
      <div id="logosRegister">
        <img id="fb" src="img/Facebook.png">
        <img id="google" src="img/Google.png">
      </div>
      <p>¿No tienes una cuenta?<a id="btnRegistrar" href="#/registro"> Regístrate</a></p>
    </div> `;

  const btnIngresar = divElement.querySelector('#btnEntrar');
  btnIngresar.addEventListener('click', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#emailLogIn').value;
    const pass = divElement.querySelector('#contraseñaLogIn').value;
    const errorEmailLogIn = divElement.querySelector('#errorEmailLogIn');
    const errorPassLogIn = divElement.querySelector('#errorPassLogIn');

    // Verificación de inputs vacíos
    if (email === '') {
      errorEmailLogIn.textContent = 'Este campo es obligatorio';
      errorEmailLogIn.style.visibility = 'visible';
    } else {
      errorEmailLogIn.style.visibility = 'hidden';
    }
    if (pass === '') {
      errorPassLogIn.textContent = 'Este campo es obligatorio';
      errorPassLogIn.style.visibility = 'visible';
    } else {
      errorPassLogIn.style.visibility = 'hidden';
    }
    // Ingresar con cuenta registrada en el form
    signInEmail(email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuario en sesión con correo:', user.displayName);
        // No cambiar view si el email no ha sido verificado
        if (user.emailVerified === false) {
          window.location.hash = '#/';
          errorEmailLogIn.textContent = 'Esta cuenta aún no está verificada';
          errorEmailLogIn.style.visibility = 'visible';
        } else {
          window.location.hash = '#/inicio';
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(errorCode, error.message);
        // Verificación de errores de campo
        if (errorCode === 'auth/user-not-found') {
          errorEmailLogIn.textContent = 'Cuenta no encontrada';
          errorEmailLogIn.style.visibility = 'visible';
        } else if (email !== '' && errorCode === 'auth/invalid-email') {
          errorEmailLogIn.textContent = 'Formato incorrecto';
          errorEmailLogIn.style.visibility = 'visible';
        } else if (email !== '') {
          errorEmailLogIn.style.visibility = 'hidden';
        }
        if (pass !== '' && errorCode === 'auth/wrong-password') {
          errorPassLogIn.textContent = 'Contraseña de logueo incorrecta';
          errorPassLogIn.style.visibility = 'visible';
        } else if (pass !== '') {
          errorPassLogIn.style.visibility = 'hidden';
        }
      });
  });

  // Ingresar con cuenta de Google
  const btnGoogle = divElement.querySelector('#google');
  btnGoogle.addEventListener('click', () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        window.location.hash = '#/inicio';
        console.log('Usuario en sesión con Google:', user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('¡error!=> ', errorCode, errorMessage);
        // window.location.hash = '#/'; // No es necesario
      });
  });
  return divElement;
};
