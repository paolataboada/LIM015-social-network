export default () => {
  // document.querySelector('nav').style.display = 'none';
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
        <button id = "btnEntrar" type="submit">Ingresar</button>
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
  btnIngresar.addEventListener('submit', () => {
    const email = divElement.querySelector('#emailIngresar').value;
    const password = divElement.querySelector('#contraseñaIngresar').value;
    console.log(email);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log('login', userCredential);
        // Signed in
        const user = userCredential.user;
        console.log('login', userCredential, user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });
  return divElement;
};
