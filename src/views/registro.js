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
        <img src="img/Facebook.png">
        <img src="img/Google.png">
      </div>
      <p>No tienes una cuenta? <a id="btnRegistrar" href="#/modal">Regístrate</a></p>
    </div> `;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerRegistro');
  divElement.innerHTML = registro;

  const btnIngresar = divElement.querySelector('#btnEntrar');
  btnIngresar.addEventListener('click', () => {
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
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  });
  return divElement;
};
